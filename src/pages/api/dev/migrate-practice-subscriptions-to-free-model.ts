// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { get } from 'env-var';
import { prisma as prismaInstance } from '@/lib/prisma';
import { PlanStatus } from '@prisma/client';
import { addYears } from 'date-fns';
import { TransactionV1 } from '@/lib/shared/utils';
import * as z from 'zod';

const API_KEY = get('THERIFY_DEV_MOVE_TO_FREE_PRACTICE_PLANS').asString();

const definition = z.object({
    getPractices: z.object({
        practices: z
            .object({
                id: z.string(),
                practiceOwnerId: z.string(),
                plans: z
                    .object({
                        id: z.string(),
                        status: z.nativeEnum(PlanStatus),
                    })
                    .array(),
            })
            .array(),
    }),
    invalidatePracticePlans: z.object({
        rollbackPlanIds: z.string().array(),
        practicesWithActivePlans: z
            .object({
                id: z.string(),
                practiceOwnerId: z.string(),
                plans: z
                    .object({
                        id: z.string(),
                        status: PlanStatus.active,
                    })
                    .array(),
            })
            .array(),
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
                    const practices = await prisma.practice.findMany({
                        select: {
                            id: true,
                            practiceOwnerId: true,
                            plans: {
                                select: {
                                    id: true,
                                    status: true,
                                },
                                orderBy: {
                                    createdAt: 'desc',
                                },
                                take: 1,
                            },
                        },
                    });
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
                    const practicesWithActivePlans = practices.filter(
                        (practice) => {
                            const plan = practice.plans[0];
                            return !!plan && plan.status === PlanStatus.active;
                        }
                    );
                    const planIds = practicesWithActivePlans.map(
                        (practice) => practice.plans[0].id
                    );
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
                        practicesWithActivePlans,
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
                async commit(
                    { prisma },
                    { invalidatePracticePlans: { practicesWithActivePlans } }
                ) {
                    const newPlans = await prisma.plan.createMany({
                        data: practicesWithActivePlans.map((practice) => ({
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
        allPractices: result.value.getPractices.practices.length,
        practicesWithActivePlans:
            result.value.invalidatePracticePlans.practicesWithActivePlans
                .length,
        invalidatedPlans:
            result.value.invalidatePracticePlans.rollbackPlanIds.length,
        newPlans: result.value.createFreePlans.createdPlansCount,
    });
}
