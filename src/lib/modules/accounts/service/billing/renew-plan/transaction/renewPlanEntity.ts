import { PlanStatus } from '@prisma/client';
import { RenewPlanTransaction } from './definition';

export const step: RenewPlanTransaction['renewPlanEntity'] = {
    async commit({ prisma }, { findPlanEntity: { planId: id } }) {
        await prisma.plan.update({
            where: {
                id,
            },
            data: {
                status: PlanStatus.active,
                renews: true,
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
