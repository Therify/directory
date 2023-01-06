import nodeFetch from 'node-fetch';
import { Auth0Entity } from '../schema';
import { getResourceEndpoint } from '../get-resource-endpoint';
import { tokenProvider } from '../token-provider';
import { Input } from './schema';

export const createUser = async (input: Input): Promise<Auth0Entity.User> => {
    const url = getResourceEndpoint('USER');
    const token = await tokenProvider.retrieveToken();
    const response = await nodeFetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
    });
    const data = await response.json();
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    return Auth0Entity.UserSchema.parse(data);
};
