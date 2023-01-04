import { generateWithConfig } from '@/lib/utils';
import { get } from 'env-var';

export const AUTH0_DOMAIN = 'AUTH0_DOMAIN' as const;
export const AUTH0_CLIENT_ID = 'AUTH0_CLIENT_ID' as const;
export const AUTH0_CLIENT_SECRET = 'AUTH0_CLIENT_SECRET' as const;
export const AUTH0_CONNECTION = 'AUTH0_CONNECTION' as const;

export interface Auth0VendorConfiguration {
    AUTH0_DOMAIN: string;
    AUTH0_CLIENT_ID: string;
    AUTH0_CLIENT_SECRET: string;
    AUTH0_CONNECTION: string;
}

export function getAuth0VendorConfiguration(
    overrides: Partial<Auth0VendorConfiguration> = {}
): Auth0VendorConfiguration {
    return {
        AUTH0_DOMAIN: get(AUTH0_DOMAIN).required().asString(),
        AUTH0_CLIENT_ID: get(AUTH0_CLIENT_ID).required().asString(),
        AUTH0_CLIENT_SECRET: get(AUTH0_CLIENT_SECRET).required().asString(),
        AUTH0_CONNECTION: get(AUTH0_CONNECTION)
            .default('Username-Password-Authentication')
            .asString(),
        ...overrides,
    };
}

export const withAuth0VendorConfiguration = generateWithConfig(
    getAuth0VendorConfiguration
);
