import { Input, Output } from './schema';
import { getAccessToken } from '../get-access-token';
import { getResourceEndpoint } from '../get-resource-endpoint';
import { auth0UserSchema } from '../../types';

/**
 * Create a new Auth0 user
 * @see https://auth0.com/docs/api/management/v2#!/Users/post_users
 * @param input  {Input}
 * @returns
 */
export async function createUser(input: Input): Promise<Output> {
    const endpoint = getResourceEndpoint('USERS');
    const accessToken = await getAccessToken();
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken.access_token}`,
        },
        body: JSON.stringify(input),
    });

    if (!response.ok) {
        throw new Error(`Failed to create user: ${response.statusText}`);
    }
    const result = await response.json();
    return auth0UserSchema.parse(result);
}
