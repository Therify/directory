import { CreatePractice } from '@/lib/features/onboarding';

import { CreatePracticeTransaction } from './definition';

export const factory = ({
    seatCount,
    priceId,
}: CreatePractice.Input): CreatePracticeTransaction['createStripeCheckoutSession'] => ({
    async commit({ stripe }, { getUserDetails: { stripeCustomerId } }) {
        const { url: checkoutSessionUrl, id: checkoutSessionId } =
            await stripe.createCheckoutSession({
                priceId,
                customerId: stripeCustomerId,
                quantity: seatCount,
                checkoutMode: 'subscription',
                cancelUrl: '',
                successUrl: '',
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
    async rollback() {
        //TODO: Expire the stripe session
        return;
    },
});
