import { RegisterProvider } from '@/lib/features/registration';

import { RegisterProviderTransaction } from './definition';

export const factory = ({
    providerDetails: { emailAddress },
    priceId,
    numberOfSeats,
}: RegisterProvider.Input): RegisterProviderTransaction['createStripeCheckoutSession'] => ({
    async commit(
        { stripe },
        {
            createStripeCustomer: { customerId },
            createAuth0User: { auth0UserId },
        }
    ) {
        const { id: stripeCheckoutSessionId, url: stripeCheckoutSessionUrl } =
            await stripe.createCheckoutSession({
                priceId,
                quantity: numberOfSeats,
                customerId,
                checkoutMode: 'subscription',
                cancelUrl: 'http://localhost:4200/provider/register/cancel',
                successUrl: `http://localhost:4200/provider/register/success?email=${emailAddress}&user=${auth0UserId}`,
                allowPromotionCodes: true,
            });
        if (!stripeCheckoutSessionUrl) {
            throw new Error('No Stripe checkout session URL was returned.');
        }
        return {
            stripeCheckoutSessionId,
            stripeCheckoutSessionUrl,
        };
    },
    async rollback({ stripe }, { createStripeCustomer: { customerId } }) {
        return stripe.deleteCustomer({ customerId });
    },
});
