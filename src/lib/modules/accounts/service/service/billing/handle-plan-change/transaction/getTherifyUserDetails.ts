import { HandlePlanChange } from '@/lib/modules/accounts/features/billing';
import { HandlePlanChangeTransaction } from './definition';

interface GetTherifyUserDetailsFactory {
    (
        params: HandlePlanChange.Input
    ): HandlePlanChangeTransaction['getTherifyUserDetails'];
}

export const factory: GetTherifyUserDetailsFactory = ({
    stripeCustomerId,
}) => ({
    async commit({ prisma }) {
        const { managedPractice, id: practiceOwnerId } =
            await prisma.user.findUniqueOrThrow({
                where: { stripeCustomerId },
                select: {
                    id: true,
                    managedPractice: { select: { id: true } },
                },
            });
        const practiceId = managedPractice?.id;

        if (!practiceId) {
            throw new Error('No practice found for customer.');
        }
        return { practiceId, practiceOwnerId };
    },
    async rollback() {
        return;
    },
});
