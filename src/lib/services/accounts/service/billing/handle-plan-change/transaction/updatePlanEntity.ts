import { HandlePlanChange } from '@/lib/features/accounts/billing';
import { HandlePlanChangeTransaction } from './definition';

interface UpdatePlanEntityFactory {
    (
        params: HandlePlanChange.Input
    ): HandlePlanChangeTransaction['updatePlanEntity'];
}

export const factory: UpdatePlanEntityFactory = ({ newSeatCount }) => ({
    async commit({ prisma }, { getPlanDetails: { planId } }) {
        await prisma.plan.update({
            where: { id: planId },
            data: {
                seats: newSeatCount,
            },
        });
        return { newSeatCount };
    },
    async rollback(
        { prisma },
        { getPlanDetails: { planId, seatCount: previousSeatCount } }
    ) {
        return await prisma.plan.update({
            where: { id: planId },
            data: {
                seats: previousSeatCount,
            },
        });
    },
});
