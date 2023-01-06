import { generateGetResourceEndpoint } from './getResourceEndpoint';

describe('getResourceEndpoint', () => {
    const getResourceEndpoint = generateGetResourceEndpoint({
        AUTH0_DOMAIN: 'example.com',
    });
    test.each([
        ['USERS', 'https://example.com/api/v2/users'],
        ['USER', 'https://example.com/api/v2/users/:id'],
        ['OAUTH_TOKEN', 'https://example.com/api/v2/oauth/token'],
    ])(`%s should return %s`, (resource, expected) => {
        expect(getResourceEndpoint(resource as any)).toEqual(expected);
    });
});
