import Stripe from 'stripe';
import { StripeVendorFactoryParams } from '../types';
import { Input } from './schema';

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
        connectedAccountData,
    }: Input): Promise<Stripe.Checkout.Session> => {
        return await stripe.checkout.sessions.create({
            customer: customerId,
            line_items: [{ price: priceId, quantity }],
            mode: checkoutMode,
            success_url: successUrl,
            cancel_url: cancelUrl,
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            allow_promotion_codes: allowPromotionCodes,

            ...(connectedAccountData
                ? {
                      payment_intent_data: {
                          receipt_email: connectedAccountData.receiptEmail,
                          transfer_data: {
                              destination:
                                  connectedAccountData.stripeConnectAccountId,
                          },

                          application_fee_amount:
                              connectedAccountData.applicationFee,
                      },
                  }
                : {}),

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
    };
