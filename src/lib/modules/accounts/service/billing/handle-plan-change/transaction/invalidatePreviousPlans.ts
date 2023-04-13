import { PlanStatus } from '@prisma/client';
import { HandlePlanChangeTransaction } from './definition';

export const step: HandlePlanChangeTransaction['invalidatePreviousPlans'] = {
    async commit(
        { prisma },
        { getTherifyUserDetails: { practiceOwnerId, practiceId } }
    ) {
        const plans = await prisma.plan.findMany({
            select: {
                id: true,
            },
            where: {
                practiceId,
                status: PlanStatus.active,
            },
        });

        const planIds = plans.map(({ id }) => id);
        const updateCount = await prisma.plan.updateMany({
            where: {
                id: { in: planIds },
            },
            data: {
                status: PlanStatus.invalidated,
            },
        });
        if (updateCount.count !== planIds.length) {
            throw new Error(
                'Failed to invalidate all previously active plans.'
            );
        }

        return { invalidatedPlanIds: planIds };
    },
    async rollback(
        { prisma },
        { invalidatePreviousPlans: { invalidatedPlanIds } }
    ) {
        return await prisma.plan.updateMany({
            where: { id: { in: invalidatedPlanIds } },
            data: {
                status: PlanStatus.active,
            },
        });
    },
};
