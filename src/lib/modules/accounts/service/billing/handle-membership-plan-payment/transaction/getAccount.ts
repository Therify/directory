import { HandleMembershipPlanPayment } from '@/lib/modules/accounts/features/billing';
import { HandleMembershipPlanPaymentTransaction } from './definition';

interface GetTherifyIdentifiersFactory {
    (
        params: HandleMembershipPlanPayment.Input
    ): HandleMembershipPlanPaymentTransaction['getAccount'];
}

export const factory: GetTherifyIdentifiersFactory = ({
    stripeCustomerId,
}) => ({
    async commit({ prisma }) {
        const { managedAccount, id: accountOwnerId } =
            await prisma.user.findUniqueOrThrow({
                where: { stripeCustomerId },
                select: {
                    id: true,
                    managedAccount: { select: { id: true } },
                },
            });
        const accountId = managedAccount?.id;
        if (!accountId) {
            throw new Error('No account found for customer.');
        }
        return { accountId, accountOwnerId };
    },
    async rollback() {
        return;
    },
});
