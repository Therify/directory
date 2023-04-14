import { StripeVendorFactoryParams } from '../types';
import { Input, Output } from './schema';

export interface CreateBillingPortalFactoryParams
    extends StripeVendorFactoryParams {}

export const factory =
    ({ stripe }: CreateBillingPortalFactoryParams) =>
    async ({ headline, products, metadata }: Input): Promise<Output> => {
        const configuration = await stripe.billingPortal.configurations.create({
            metadata,
            business_profile: {
                headline:
                    headline ??
                    'Therify, Inc partners with Stripe for simplified billing.',
            },
            features: {
                customer_update: {
                    enabled: true,
                    allowed_updates: ['address', 'email', 'name', 'phone'],
                },
                invoice_history: { enabled: true },
                payment_method_update: { enabled: true },
                subscription_cancel: {
                    enabled: true,
                    mode: 'at_period_end',
                    cancellation_reason: {
                        enabled: true,
                        options: [
                            'too_expensive',
                            'missing_features',
                            'switched_service',
                            'unused',
                            'customer_service',
                            'too_complex',
                            'low_quality',
                            'other',
                        ],
                    },
                },
                subscription_update: {
                    enabled: true,
                    default_allowed_updates: [
                        'price',
                        'quantity',
                        'promotion_code',
                    ],
                    products: products.map(({ productId, priceIds }) => ({
                        product: productId,
                        prices: priceIds,
                    })),
                },
            },
        });
        return {
            configurationId: configuration.id,
            liveMode: configuration.livemode,
        };
    };
