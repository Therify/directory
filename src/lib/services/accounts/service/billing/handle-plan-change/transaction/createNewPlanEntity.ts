import { HandlePlanChange } from '@/lib/features/accounts/billing';
import { PlanStatus } from '@prisma/client';
import { HandlePlanChangeTransaction } from './definition';

interface CreateNewPlanEntityFactory {
    (
        params: HandlePlanChange.Input
    ): HandlePlanChangeTransaction['createNewPlanEntity'];
}

export const factory: CreateNewPlanEntityFactory = ({
    startDate,
    endDate,
    newSeatCount,
    newStripePriceId,
    stripeSubscriptionId,
    stripeCustomerId,
}) => ({
    async commit({ prisma }, { getTherifyUserDetails: { therifyUserId } }) {
        const { id: planId } = await prisma.plan.create({
            data: {
                startDate,
                endDate,
                status: PlanStatus.active,
                billingUserId: therifyUserId,
                userId: therifyUserId,
                stripeCustomerId,
                stripeSubscriptionId,
                stripePriceId: newStripePriceId,
                seats: newSeatCount,
            },
        });
        return { planId };
    },
    async rollback({ prisma }, { createNewPlanEntity: { planId } }) {
        return prisma.plan.delete({
            where: { id: planId },
        });
    },
});
