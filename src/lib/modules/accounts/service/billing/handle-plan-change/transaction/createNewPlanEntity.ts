import { HandlePlanChange } from '@/lib/modules/accounts/features/billing';
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
    async commit(
        { prisma },
        { getTherifyUserDetails: { practiceOwnerId, practiceId } }
    ) {
        const { id: planId } = await prisma.plan.create({
            data: {
                startDate,
                endDate,
                status: PlanStatus.active,
                billingUserId: practiceOwnerId,
                practiceId,
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
