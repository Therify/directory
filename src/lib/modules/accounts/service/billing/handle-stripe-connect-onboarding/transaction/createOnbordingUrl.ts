import { HandleStripeConnectOnboarding } from '@/lib/modules/accounts/features/billing';
import { HandleStripeConnectOnboardingTransaction } from './definition';

interface GetTherifyUserDetailsFactory {
    (
        params: HandleStripeConnectOnboarding.Input
    ): HandleStripeConnectOnboardingTransaction['createOnbordingUrl'];
}

export const factory: GetTherifyUserDetailsFactory = ({
    refreshUrl,
    returnUrl,
}) => ({
    async commit(
        { stripe },
        { createStripeConnectAccount: { stripeConnectAccountId } }
    ) {
        const { onboardingUrl: stripeConnectOnboardingUrl } =
            await stripe.createAccountLink({
                refreshUrl,
                returnUrl,
                accountId: stripeConnectAccountId,
            });

        return { stripeConnectOnboardingUrl };
    },
    async rollback() {
        return;
    },
});
