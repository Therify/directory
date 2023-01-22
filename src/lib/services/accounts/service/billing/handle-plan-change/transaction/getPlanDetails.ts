import { HandlePlanChange } from '@/lib/features/accounts/billing';
import { HandlePlanChangeTransaction } from './definition';

interface GetPlanDetailsFactory {
    (
        params: HandlePlanChange.Input
    ): HandlePlanChangeTransaction['getPlanDetails'];
}

export const factory: GetPlanDetailsFactory = ({
    stripeCustomerId,
    newStripePriceId,
    startDate,
    endDate,
    previousSeatCount,
}) => ({
    async commit({ prisma }) {
        const { id: therifyUserId, plans } =
            await prisma.user.findUniqueOrThrow({
                where: { stripeCustomerId },
                select: {
                    id: true,
                    plans: {
                        select: { id: true, seats: true },
                        where: {
                            startDate,
                            endDate,
                            // Note: If we ever start offering multiple subscritpions plans/tiers (resulting in different priceIds),
                            // we'll need to change this.
                            stripePriceId: newStripePriceId,
                        },
                        orderBy: {
                            createdAt: 'desc',
                        },
                        take: 1,
                    },
                },
            });
        const [currentPlan] = plans;

        if (!currentPlan) {
            throw new Error('No plan found for user.');
        }

        if (previousSeatCount !== currentPlan.seats) {
            throw new Error(
                "Previous seat count does not match plan's seat count prior to update."
            );
        }

        return {
            therifyUserId,
            planId: currentPlan.id,
            seatCount: currentPlan.seats,
        };
    },
    async rollback() {
        return;
    },
});
