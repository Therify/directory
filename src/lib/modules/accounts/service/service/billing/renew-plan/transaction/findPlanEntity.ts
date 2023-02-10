import { RenewPlan } from '@/lib/modules/accounts/features/billing';
import { RenewPlanTransaction } from './definition';

interface FindPlanEntityFactory {
    (params: RenewPlan.Input): RenewPlanTransaction['findPlanEntity'];
}

export const factory: FindPlanEntityFactory = ({ stripeSubscriptionId }) => ({
    async commit({ prisma }) {
        const plan = await prisma.plan.findFirstOrThrow({
            where: {
                stripeSubscriptionId,
                renews: false,
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
