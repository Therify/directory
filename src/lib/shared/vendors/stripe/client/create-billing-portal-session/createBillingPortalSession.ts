import Stripe from 'stripe';
import { StripeVendorFactoryParams } from '../types';
import { Input, Output } from './schema';

export interface CreateBillingPortalFactoryParams
    extends StripeVendorFactoryParams {}

export const factory =
    ({ stripe }: CreateBillingPortalFactoryParams) =>
    async ({}: Input): Promise<Output> => {
        return {
            sessionUrl: '// TODO: Implement',
        };
    };
