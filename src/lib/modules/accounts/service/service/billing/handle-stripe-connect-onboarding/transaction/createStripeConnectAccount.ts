import { HandleStripeConnectOnboarding } from '@/lib/modules/accounts/features/billing';
import { HandleStripeConnectOnboardingTransaction } from './definition';
interface GetTherifyUserDetailsFactory {
    (
        params: HandleStripeConnectOnboarding.Input
    ): HandleStripeConnectOnboardingTransaction['createStripeConnectAccount'];
}

export const factory: GetTherifyUserDetailsFactory = ({
    userId: therifyUserId,
}) => ({
    async commit(
        { stripe },
        {
            getUserDetails: {
                user: { givenName, surname, dateOfBirth, emailAddress: email },
                stripeConnectAccountId,
            },
        }
    ) {
        if (stripeConnectAccountId) {
            return { stripeConnectAccountId };
        }
        const { accountId: newStripeConnectAccountId } =
            await stripe.createExpressAccount({
                email,
                givenName,
                surname,
                dateOfBirth: dateOfBirth.toISOString(),
                therifyUserId,
            });

        return { stripeConnectAccountId: newStripeConnectAccountId };
    },
    async rollback(
        { stripe },
        { createStripeConnectAccount: { stripeConnectAccountId } }
    ) {
        return await stripe.deleteExpressAccount(stripeConnectAccountId);
    },
});
