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
        successUrl,
        cancelUrl,
        submitMessage,
        allowPromotionCodes = true,
        connectedAccountData,
        expiresInSeconds,
        metadata,
        ...priceData
    }: Input): Promise<Stripe.Checkout.Session> => {
        if ('lineItems' in priceData && priceData.lineItems.length === 0) {
            throw new Error('No line items provided.');
        }
        const lineItems: Stripe.Checkout.SessionCreateParams['line_items'] =
            'priceId' in priceData
                ? [
                      {
                          price: priceData.priceId,
                          quantity: priceData.quantity ?? 1,
                      },
                  ]
                : priceData.lineItems.map(({ priceId, quantity }) => ({
                      price: priceId,
                      quantity: quantity ?? 1,
                  }));
        return await stripe.checkout.sessions.create({
            customer: customerId,
            line_items: lineItems,
            mode: checkoutMode,
            success_url: successUrl,
            cancel_url: cancelUrl,
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            allow_promotion_codes: allowPromotionCodes,
            expires_at: expiresInSeconds,
            metadata,
            ...(connectedAccountData
                ? {
                      payment_intent_data: {
                          receipt_email: connectedAccountData.receiptEmail,
                          transfer_data: {
                              destination:
                                  connectedAccountData.stripeConnectAccountId,
                          },
                          application_fee_amount:
                              connectedAccountData.applicationFeeInCents,
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
