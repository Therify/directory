import { PlanStatus } from '@prisma/client';
import { HandleMembershipPlanPayment } from '@/lib/modules/accounts/features/billing';
import { HandleMembershipPlanPaymentTransaction } from './definition';

interface CreateSubscriptionEntityFactory {
    (
        params: HandleMembershipPlanPayment.Input
    ): HandleMembershipPlanPaymentTransaction['createPlanEntity'];
}

export const factory: CreateSubscriptionEntityFactory = ({
    startDate,
    endDate,
    priceId: stripePriceId,
    stripeCustomerId,
    stripeSubscriptionId,
    seats,
    coveredSessions,
}) => ({
    async commit({ prisma }, { getAccount: { accountId, accountOwnerId } }) {
        const { id: planId } = await prisma.plan.create({
            data: {
                startDate,
                endDate,
                status: PlanStatus.active,
                billingUserId: accountOwnerId,
                accountId,
                stripeCustomerId,
                stripeSubscriptionId,
                stripePriceId,
                seats,
                coveredSessions,
            },
        });
        return { planId };
    },
    async rollback({ prisma }, { createPlanEntity: { planId } }) {
        return prisma.plan.delete({ where: { id: planId } });
    },
});
