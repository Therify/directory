import { PlanStatus } from '@prisma/client';
import { HandleGroupPracticePlanPayment } from '@/lib/features/accounts/billing';
import { HandleGroupPracticePlanPaymentTransaction } from './definition';

interface CreateSubscriptionEntityFactory {
    (
        params: HandleGroupPracticePlanPayment.Input
    ): HandleGroupPracticePlanPaymentTransaction['createPlanEntity'];
}

export const factory: CreateSubscriptionEntityFactory = ({
    startDate,
    endDate,
    priceId: stripePriceId,
    stripeCustomerId,
    stripeSubscriptionId,
    seats,
}) => ({
    async commit(
        { prisma },
        { getTherifyIdentifiers: { therifyUserId: userId } }
    ) {
        const { id: planId } = await prisma.plan.create({
            data: {
                startDate,
                endDate,
                status: PlanStatus.active,
                billingUserId: userId,
                userId,
                stripeCustomerId,
                stripeSubscriptionId,
                stripePriceId,
                seats,
            },
        });
        return { planId };
    },
    async rollback({ prisma }, { createPlanEntity: { planId } }) {
        return prisma.plan.delete({ where: { id: planId } });
    },
});
