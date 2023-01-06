import nodeFetch from 'node-fetch';
import { getResourceEndpoint } from '../get-resource-endpoint';
import { tokenProvider } from '../token-provider';

export const deleteUser = async (userId: string): Promise<void> => {
    const url = getResourceEndpoint('USER');
    const token = await tokenProvider.retrieveToken();
    const formattedURL = url.replace(':id', userId);
    const response = await nodeFetch(formattedURL, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 204) {
        throw new Error(response.statusText);
    }
};
