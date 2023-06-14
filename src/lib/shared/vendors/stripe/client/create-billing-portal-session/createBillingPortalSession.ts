import { StripeVendorFactoryParams } from '../types';
import { Input, Output } from './schema';

export interface CreateBillingPortalSessionFactoryParams
    extends StripeVendorFactoryParams {}

export const factory =
    ({ stripe }: CreateBillingPortalSessionFactoryParams) =>
    async ({ customerId, returnUrl: return_url }: Input): Promise<Output> => {
        const link = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url,
        });
        return { billingPortalUrl: link.url };
    };
