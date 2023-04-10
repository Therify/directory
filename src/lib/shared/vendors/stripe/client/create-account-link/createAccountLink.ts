import { StripeVendorFactoryParams } from '../types';
import { Input, Output } from './schema';

export interface CreateAccountLinkFactoryParams
    extends StripeVendorFactoryParams {}

export const factory =
    ({ stripe }: CreateAccountLinkFactoryParams) =>
    async ({
        accountId,
        refreshUrl: refresh_url,
        returnUrl: return_url,
    }: Input): Promise<Output> => {
        const link = await stripe.accountLinks.create({
            account: accountId,
            refresh_url,
            return_url,
            type: 'account_onboarding',
        });
        return { onboardingUrl: link.url };
    };
