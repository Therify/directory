import { HandlePlanChange } from '@/lib/features/accounts/billing';
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
        const { id: therifyUserId } = await prisma.user.findUniqueOrThrow({
            where: { stripeCustomerId },
            select: {
                id: true,
            },
        });

        return {
            therifyUserId,
        };
    },
    async rollback() {
        return;
    },
});
