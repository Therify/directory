import { getAccessToken } from '../get-access-token';
import { getResourceEndpoint } from '../get-resource-endpoint';

export async function deleteUser(userId: string): Promise<void> {
    const endpoint = getResourceEndpoint('USERS', userId);
    const accessToken = await getAccessToken();
    const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken.access_token}`,
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.statusText}`);
    }
}
