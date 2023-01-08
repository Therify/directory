import { Auth0User, auth0UserSchema } from '../../types';
import { getAccessToken } from '../get-access-token';
import { getResourceEndpoint } from '../get-resource-endpoint';

export async function getUser(userId: string): Promise<Auth0User> {
    const endpoint = getResourceEndpoint('USERS', userId);
    const accessToken = await getAccessToken();
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken.access_token}`,
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to get user: ${response.statusText}`);
    }
    const result = await response.json();
    return auth0UserSchema.parse(result);
}
