// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { get } from 'env-var';
import { vendorStripe } from '@/lib/shared/vendors/stripe';

const API_KEY = get('REMOVE_STRIPE_CONNECT_ACCOUNT').asString();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ deleted: boolean }>
) {
    if (req.method !== 'POST' || API_KEY === undefined) {
        return res.status(404).end();
    }
    if (req.headers.api_key !== API_KEY) {
        console.log('Invalid API key', { key: req.headers.api_key });
        return res.status(400).end();
    }
    const { stripeConnectId } = req.body;
    if (!stripeConnectId || typeof stripeConnectId !== 'string') {
        return res.status(400).end();
    }
    console.log('Deleting Stripe connect account...');
    const { deleted } = await vendorStripe.deleteConnectAccount(
        stripeConnectId
    );

    return res.status(200).json({
        deleted,
    });
}
