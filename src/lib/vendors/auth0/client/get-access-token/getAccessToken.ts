import { getResourceEndpoint } from '../get-resource-endpoint';
import nodeFetch from 'node-fetch';
import { Auth0AccessToken, auth0AccessTokenSchema } from '../../types';

/**
 * Auth0 API access token
 * @see https://auth0.com/docs/api/management/v2/tokens
 */
let ACCESS_TOKEN: Auth0AccessToken | null = null;
/**
 * Auth0 API access token expiration time
 * @see https://auth0.com/docs/api/management/v2/tokens
 */
let EXPIRATION_TIME: Date | null = null;

/**
 *  Get Auth0 API access token
 * @returns Auth0 API access token
 */
export const getAccessToken = async (): Promise<Auth0AccessToken> => {
    if (ACCESS_TOKEN && EXPIRATION_TIME && EXPIRATION_TIME > new Date()) {
        return ACCESS_TOKEN;
    }

    const endpoint = getResourceEndpoint('OAUTH_TOKEN');
    const response = await nodeFetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: process.env.AUTH0_AUDIENCE,
            grant_type: 'client_credentials',
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.statusText}`);
    }

    const data = await response.json();
    const result = auth0AccessTokenSchema.parse(data);

    ACCESS_TOKEN = result;
    EXPIRATION_TIME = new Date(Date.now() + result.expires_in * 1000);

    return ACCESS_TOKEN;
};

/**
 * Clear Auth0 API access token
 * @returns void
 * @see https://auth0.com/docs/api/management/v2/tokens
 */
export const clearAccessToken = (): void => {
    ACCESS_TOKEN = null;
    EXPIRATION_TIME = null;
};
