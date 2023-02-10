import { get } from 'env-var';
import { generateWithConfig } from '@/lib/shared/utils';

/**
 * Auth0 Domain - The domain of your Auth0 tenant
 * @see https://auth0.com/docs/get-started/dashboard
 */
const AUTH0_BACKEND_DOMAIN = 'AUTH0_BACKEND_DOMAIN' as const;
/**
 * Auth0 Client ID - The client ID of your Auth0 Machine to Machine application
 * @see https://auth0.com/docs/applications
 * @see https://auth0.com/docs/applications/set-up-an-application
 */
const AUTH0_BACKEND_CLIENT_ID = 'AUTH0_BACKEND_CLIENT_ID' as const;
/**
 * Auth0 Client Secret - The client secret of your Auth0 Machine to Machine application
 * @see https://auth0.com/docs/applications
 */
const AUTH0_BACKEND_CLIENT_SECRET = 'AUTH0_BACKEND_CLIENT_SECRET' as const;

/**
 * Auth0 Configuration
 * @property {string} AUTH0_BACKEND_DOMAIN - The domain of your Auth0 tenant
 * @property {string} AUTH0_BACKEND_CLIENT_ID - The client ID of your Auth0 application
 * @property {string} AUTH0_BACKEND_CLIENT_SECRET - The client secret of your Auth0 application
 */
export interface Auth0Configuration {
    AUTH0_BACKEND_DOMAIN: string;
    AUTH0_BACKEND_CLIENT_ID: string;
    AUTH0_BACKEND_CLIENT_SECRET: string;
}

/**
 * Get the Auth0 configuration
 * @param overrides - Override the default configuration
 * @returns {Auth0Configuration}
 */
export const getAuth0Configuration = (
    overrides: Partial<Auth0Configuration> = {}
) => ({
    [AUTH0_BACKEND_DOMAIN]: get(AUTH0_BACKEND_DOMAIN).required().asString(),
    [AUTH0_BACKEND_CLIENT_ID]: get(AUTH0_BACKEND_CLIENT_ID)
        .required()
        .asString(),
    [AUTH0_BACKEND_CLIENT_SECRET]: get(AUTH0_BACKEND_CLIENT_SECRET)
        .required()
        .asString(),
    ...overrides,
});

/**
 * Passes the Auth0 configuration to the provided function
 */
export const withAuth0Configuration = generateWithConfig(getAuth0Configuration);
