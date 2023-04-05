import Stripe from 'stripe';
import { StripeVendorFactoryParams } from '../types';

export interface CreateAccountFactoryParams extends StripeVendorFactoryParams {}

/**
 * Creates a url for users to externally login to Stripe Connect's Account Dashboard
 * @param connectedAccountId Stripe Connect Account Id
 * @returns account's login url
 */
export const factory =
    ({ stripe }: CreateAccountFactoryParams) =>
    async (connectedAccountId: string): Promise<Stripe.LoginLink['url']> => {
        const { url } = await stripe.accounts.createLoginLink(
            connectedAccountId
        );
        return url;
    };
