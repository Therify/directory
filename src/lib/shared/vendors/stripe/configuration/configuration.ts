import { generateWithConfig } from '@/lib/shared/utils';
import { get } from 'env-var';

export const STRIPE_SECRET_KEY = 'STRIPE_SECRET_KEY' as const;

export interface StripeConfiguration {
    STRIPE_SECRET_KEY: string;
}

export const getStripeConfiguration = (
    overrides: Partial<StripeConfiguration> = {}
) => {
    return {
        [STRIPE_SECRET_KEY]: get(STRIPE_SECRET_KEY).required().asString(),
    };
};

export const withStripeConfiguration = generateWithConfig(
    getStripeConfiguration
);
