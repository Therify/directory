import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';
import { getProductsByEnvironment, PRODUCTS } from '@/lib/shared/types';
import { NodeEnvironment } from '@/lib/shared/types/nodeEnvironment';
import { URL_PATHS } from '@/lib/sitemap';

import { HandlePracticeOnboardingTransaction } from './definition';

const GROUP_PRACTICE_PRODUCT = getProductsByEnvironment(
    process.env.NEXT_PUBLIC_VERCEL_ENV as NodeEnvironment
)[PRODUCTS.GROUP_PRACTICE_PLAN];

export const factory = ({
    seatCount,
    billingCycle,
}: HandlePracticeOnboarding.Input): HandlePracticeOnboardingTransaction['createStripeCheckoutSession'] => ({
    async commit({ stripe }, { getUserDetails: { stripeCustomerId } }) {
        const priceId =
            billingCycle === 'year'
                ? GROUP_PRACTICE_PRODUCT.PRICES.ANNUAL
                : GROUP_PRACTICE_PRODUCT.PRICES.MONTHLY;

        const { url: checkoutSessionUrl, id: checkoutSessionId } =
            await stripe.createCheckoutSession({
                priceId,
                customerId: stripeCustomerId,
                quantity: seatCount,
                checkoutMode: 'subscription',
                cancelUrl: `${process.env.APPLICATION_URL}${URL_PATHS.PROVIDERS.ONBOARDING.BILLING}`,
                successUrl: `${process.env.APPLICATION_URL}${URL_PATHS.PROVIDERS.ONBOARDING.BILLING_SUCCESS}`,
                allowPromotionCodes: true,
                metadata: {
                    priceId,
                },
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
