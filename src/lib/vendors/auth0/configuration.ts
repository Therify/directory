import { generateWithConfig } from '@/lib/utils';
import { get } from 'env-var';

export const AUTH0_DOMAIN = 'AUTH0_DOMAIN' as const;
export const AUTH0_CLIENT_ID = 'AUTH0_CLIENT_ID' as const;
export const AUTH0_CLIENT_SECRET = 'AUTH0_CLIENT_SECRET' as const;

export interface Auth0Configuration {
    AUTH0_DOMAIN: string;
    AUTH0_CLIENT_ID: string;
    AUTH0_CLIENT_SECRET: string;
}

export const getAuth0Configuration = (
    overrides: Partial<Auth0Configuration> = {}
): Auth0Configuration => {
    return {
        [AUTH0_DOMAIN]: get(AUTH0_DOMAIN).required().asString(),
        [AUTH0_CLIENT_ID]: get(AUTH0_CLIENT_ID).required().asString(),
        [AUTH0_CLIENT_SECRET]: get(AUTH0_CLIENT_SECRET).required().asString(),
        ...overrides,
    };
};

export const withAuth0Configuration = generateWithConfig(getAuth0Configuration);
