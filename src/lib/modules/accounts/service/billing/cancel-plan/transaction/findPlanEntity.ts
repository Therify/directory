import { CancelPlan } from '@/lib/modules/accounts/features/billing';
import { PlanStatus } from '@prisma/client';
import { CancelPlanTransaction } from './definition';

interface FindPlanEntityFactory {
    (params: CancelPlan.Input): CancelPlanTransaction['findPlanEntity'];
}

export const factory: FindPlanEntityFactory = ({ stripeSubscriptionId }) => ({
    async commit({ prisma }) {
        const plan = await prisma.plan.findFirstOrThrow({
            where: {
                stripeSubscriptionId,
                status: PlanStatus.active,
            },
            orderBy: {
                endDate: 'desc',
            },
            select: {
                id: true,
                status: true,
                renews: true,
            },
        });
        return {
            planId: plan.id,
            status: plan.status,
            renews: plan.renews,
        };
    },
    async rollback() {
        return;
    },
});
