// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { get } from 'env-var';
import { vendorStripe } from '@/lib/shared/vendors/stripe';
import { Role } from '@prisma/client';

const API_KEY = get('ADD_MISSING_STRIPE_CUSTOMER_IDS').asString();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method !== 'POST' || API_KEY === undefined) {
        return res.status(404).end();
    }
    if (req.headers.api_key !== API_KEY) {
        console.log('Invalid API key', { key: req.headers.api_key });
        return res.status(400).end();
    }
    const users = await prisma.user.findMany({
        where: {
            stripeCustomerId: null,
        },
    });
    const failedIds: string[] = [];
    const updates = await Promise.allSettled(
        users.map(async (user) => {
            try {
                const customer = await vendorStripe.createCustomer({
                    email: user.emailAddress,
                    description: user.roles.includes(Role.member)
                        ? 'Therify member'
                        : 'Therify provider',
                    name: `${user.givenName} ${user.surname}`,
                    metadata: {
                        therify_user_id: user.id,
                    },
                });

                return await prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        stripeCustomerId: customer.id,
                    },
                });
            } catch (error) {
                failedIds.push(user.id);
                console.log(error);
                throw error;
            }
        })
    );
    const fulfilled = updates.filter(
        (update) => update.status === 'fulfilled'
    ).length;
    const rejected = updates.filter((update) => update.status !== 'fulfilled');
    if (failedIds.length > 0) {
        console.log('failed updates', failedIds);
    }
    return res.status(200).json({
        total: users.length,
        fulfilled,
        rejected,
        failedIds,
    });
}
