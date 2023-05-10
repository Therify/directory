// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { get } from 'env-var';
import { prisma as prismaInstance } from '@/lib/prisma';
import { PlanStatus } from '@prisma/client';
import { addYears } from 'date-fns';
import { TransactionV1 } from '@/lib/shared/utils';
import * as z from 'zod';
import { PracticeSchema } from '@/lib/shared/schema';

const API_KEY = get('THERIFY_DEV_MOVE_TO_FREE_PRACTICE_PLANS').asString();

const definition = z.object({
    getPractices: z.object({
        practices: PracticeSchema.array(),
    }),
    invalidatePracticePlans: z.object({
        rollbackPlanIds: z.string().array(),
    }),
    createFreePlans: z.object({
        createdPlansCount: z.number(),
    }),
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Record<string, unknown>>
) {
    if (req.method !== 'POST' || API_KEY === undefined) {
        return res.status(404).end();
    }
    if (req.headers.api_key !== API_KEY) {
        console.log('Invalid API key', { key: req.headers.api_key });
        return res.status(400).end();
    }
    const result = await TransactionV1.executeTransaction(
        definition,
        { prisma: prismaInstance },
        {
            getPractices: {
                async commit({ prisma }) {
                    const practices = await prisma.practice.findMany();
                    return {
                        practices,
                    };
                },
                async rollback() {
                    return;
                },
            },
            invalidatePracticePlans: {
                async commit({ prisma }, { getPractices: { practices } }) {
                    const plans = await prisma.plan.findMany({
                        where: {
                            status: PlanStatus.active,
                            practiceId: {
                                in: practices.map((practice) => practice.id),
                            },
                        },
                        select: {
                            id: true,
                        },
                    });
                    const planIds = plans.map((plan) => plan.id);
                    await prisma.plan.updateMany({
                        where: {
                            id: {
                                in: planIds,
                            },
                        },
                        data: {
                            status: PlanStatus.invalidated,
                        },
                    });
                    return {
                        rollbackPlanIds: planIds,
                    };
                },
                async rollback(
                    { prisma },
                    { invalidatePracticePlans: { rollbackPlanIds } }
                ) {
                    await prisma.plan.updateMany({
                        where: {
                            id: {
                                in: rollbackPlanIds,
                            },
                        },
                        data: {
                            status: PlanStatus.active,
                        },
                    });
                    return;
                },
            },
            createFreePlans: {
                async commit({ prisma }, { getPractices: { practices } }) {
                    const newPlans = await prisma.plan.createMany({
                        data: practices.map((practice) => ({
                            seats: 15,
                            startDate: new Date(),
                            endDate: addYears(new Date(), 500),
                            billingUserId: practice.practiceOwnerId,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            status: PlanStatus.active,
                            renews: false,
                            practiceId: practice.id,
                        })),
                    });
                    return {
                        createdPlansCount: newPlans.count,
                    };
                },
                async rollback() {
                    return;
                },
            },
        },
        true
    );

    if (result.isErr()) {
        console.error('Error executing transaction', result.error);
        return res.status(500).send({ error: result.error });
    }

    return res.status(200).json({
        success: true,
        practices: result.value.getPractices.practices.length,
        invalidatedPlans:
            result.value.invalidatePracticePlans.rollbackPlanIds.length,
        newPlans: result.value.createFreePlans.createdPlansCount,
    });
}
