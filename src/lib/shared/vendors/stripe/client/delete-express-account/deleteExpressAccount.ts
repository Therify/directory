import { StripeVendorFactoryParams } from '../types';
import { Output } from './schema';

export interface CreateAccountFactoryParams extends StripeVendorFactoryParams {}

export const factory =
    ({ stripe }: CreateAccountFactoryParams) =>
    async (accountId: string): Promise<Output> => {
        const { deleted } = await stripe.accounts.del(accountId);
        return { deleted };
    };
