import { getAccessToken } from '../get-access-token';
import { getResourceEndpoint } from '../get-resource-endpoint';
import fetch from 'node-fetch';

export async function deleteUser(userId: string): Promise<void> {
    const endpoint = getResourceEndpoint('USER', userId);
    const accessToken = await getAccessToken();
    const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken.access_token}`,
        },
    });
    if (!response.ok) {
        console.info('response', response);
        throw new Error(`Failed to delete user: ${response.statusText}`);
    }
}
