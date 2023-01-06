import nodeFetch from 'node-fetch';
import { getResourceEndpoint } from '../get-resource-endpoint';
import { tokenProvider } from '../token-provider';
import { Auth0Entity } from '../schema';

export const getUser = async (userId: string): Promise<Auth0Entity.User> => {
    const url = getResourceEndpoint('USER');
    const token = await tokenProvider.retrieveToken();
    const formattedURL = url.replace(':id', userId);
    const response = await nodeFetch(formattedURL, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    return Auth0Entity.UserSchema.parse(data);
};
