import { getAccessToken } from '../get-access-token';
import { getResourceEndpoint } from '../get-resource-endpoint';
import { Input } from './schema';

export const assignUserRoles = async ({
    roles,
    userId,
}: Input): Promise<void> => {
    const endpoint = getResourceEndpoint('USER_ROLES', userId);
    const accessToken = await getAccessToken();
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken.access_token}`,
        },
        body: JSON.stringify({ roles }),
    });

    if (!response.ok) {
        new Error(`Failed to assign roles to user: ${response.statusText}`);
    }
};
