import { HandleStripeConnectOnboarding } from '@/lib/modules/accounts/features/billing';
import { HandleStripeConnectOnboardingTransaction } from './definition';

interface AddStripeConnectAccountToUserFactory {
    (
        params: HandleStripeConnectOnboarding.Input
    ): HandleStripeConnectOnboardingTransaction['addStripeConnectAccountToUser'];
}

export const factory: AddStripeConnectAccountToUserFactory = ({ userId }) => ({
    async commit(
        { prisma },
        { createStripeConnectAccount: { stripeConnectAccountId } }
    ) {
        await prisma.user.update({
            where: { id: userId },
            data: {
                stripeConnectAccountId,
            },
        });
        return;
    },
    async rollback({ prisma }) {
        return await prisma.user.update({
            where: { id: userId },
            data: {
                stripeConnectAccountId: null,
            },
        });
    },
});
