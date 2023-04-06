import { StripeVendorFactoryParams } from '../types';
import { Output } from './schema';

export interface DeleteAccountFactoryParams extends StripeVendorFactoryParams {}

export const factory =
    ({ stripe }: DeleteAccountFactoryParams) =>
    async (accountId: string): Promise<Output> => {
        const { deleted } = await stripe.accounts.del(accountId);
        return { deleted };
    };
