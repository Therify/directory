import { StripeVendorFactoryParams } from '../types';
import { Input, Output } from './schema';

export interface CreateBillingPortalFactoryParams
    extends StripeVendorFactoryParams {}

export const factory =
    ({ stripe }: CreateBillingPortalFactoryParams) =>
    async ({
        customerId,
        configurationId,
        returnUrl,
    }: Input): Promise<Output> => {
        const configuration = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: returnUrl,
            configuration: configurationId,
        });

        return {
            billingPortalId: configuration.id,
            billingPortalUrl: configuration.url,
        };
    };
