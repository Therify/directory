import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';
import { URL_PATHS } from '@/lib/sitemap';

import { HandlePracticeOnboardingTransaction } from './definition';

export const factory = ({
    seatCount,
    priceId,
}: HandlePracticeOnboarding.Input): HandlePracticeOnboardingTransaction['createStripeCheckoutSession'] => ({
    async commit({ stripe }, { getUserDetails: { stripeCustomerId } }) {
        const { url: checkoutSessionUrl, id: checkoutSessionId } =
            await stripe.createCheckoutSession({
                priceId,
                customerId: stripeCustomerId,
                quantity: seatCount,
                checkoutMode: 'subscription',
                cancelUrl: `${
                    process.env.VERCEL_URL
                        ? `https://${process.env.VERCEL_URL}`
                        : process.env.APPLICATION_URL
                }${URL_PATHS.PROVIDERS.ONBOARDING.BILLING}`,
                successUrl: `${
                    process.env.VERCEL_URL
                        ? `https://${process.env.VERCEL_URL}`
                        : process.env.APPLICATION_URL
                }${URL_PATHS.PROVIDERS.ONBOARDING.BILLING_SUCCESS}`,
                allowPromotionCodes: true,
            });
        if (!checkoutSessionUrl) {
            throw new Error('No session URL returned from Stripe.');
        }
        return {
            checkoutSessionId,
            checkoutSessionUrl,
        };
    },
    async rollback(
        { stripe },
        { createStripeCheckoutSession: { checkoutSessionId: sessionId } }
    ) {
        return stripe.expireCheckoutSession({ sessionId });
    },
});
