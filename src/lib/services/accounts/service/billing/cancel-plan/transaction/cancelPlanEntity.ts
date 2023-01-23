import { PlanStatus } from '@prisma/client';
import { CancelPlanTransaction } from './definition';

export const step: CancelPlanTransaction['cancelPlanEntity'] = {
    async commit({ prisma }, { findPlanEntity: { planId: id } }) {
        await prisma.plan.update({
            where: {
                id,
            },
            data: {
                status: PlanStatus.canceled,
                renews: false,
            },
        });
        return { updated: true };
    },
    async rollback(
        { prisma },
        { findPlanEntity: { planId: id, status, renews } }
    ) {
        return prisma.plan.update({
            where: {
                id,
            },
            data: { status, renews },
        });
    },
};
