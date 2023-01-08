import { getResourceEndpointFactory } from './getResourceEndpoint';

describe('getResourceEndpoint', () => {
    const getResourceEndpoint = getResourceEndpointFactory({
        AUTH0_DOMAIN: 'test.auth0.com',
    });
    it('should return the correct endpoint for a resource', () => {
        const endpoint = getResourceEndpoint('USERS');
        expect(endpoint).toEqual('https://test.auth0.com/api/v2/users');
    });

    it('should return the correct endpoint for a resource with an id', () => {
        const endpoint = getResourceEndpoint('USER', '123');
        expect(endpoint).toEqual('https://test.auth0.com/api/v2/users/123');
    });
});
