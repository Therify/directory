import Stripe from 'stripe';
import { StripeVendorFactoryParams } from '../types';
import { Input } from './schema';
// import { processStripeError } from '../../errors';
// import { StripeIntent } from '../../intents';

export interface CreateCheckoutSessionFactoryParams
    extends StripeVendorFactoryParams {}

export const factory =
    ({ stripe }: CreateCheckoutSessionFactoryParams) =>
    async ({
        checkoutMode,
        customerId,
        priceId,
        quantity = 1,
        successUrl,
        cancelUrl,
        submitMessage,
        allowPromotionCodes = true,
    }: Input): Promise<Stripe.Checkout.Session> => {
        // try {
        return await stripe.checkout.sessions.create({
            customer: customerId,
            line_items: [{ price: priceId, quantity }],
            mode: checkoutMode,
            success_url: successUrl,
            cancel_url: cancelUrl,
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            allow_promotion_codes: allowPromotionCodes,
            ...(submitMessage
                ? {
                      custom_text: {
                          submit: {
                              message: submitMessage,
                          },
                      },
                  }
                : {}),
        });
        // } catch (error) {
        //     throw processStripeError(StripeIntent.CreateCheckoutSession, error);
        // }
    };
