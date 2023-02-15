import { PlanStatus } from '@prisma/client';
import { HandleGroupPracticePlanPayment } from '@/lib/modules/accounts/features/billing';
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
    async commit({ prisma }, { getPractice: { practiceId, practiceOwnerId } }) {
        const { id: planId } = await prisma.plan.create({
            data: {
                startDate,
                endDate,
                status: PlanStatus.active,
                billingUserId: practiceOwnerId,
                practiceId,
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
