jest.mock('node-fetch', () => jest.fn());
import { generateTokenProvider } from './tokenProvider';
import nodeFetch from 'node-fetch';
import { sleep } from '@/lib/utils';
let mockFetch = jest.fn();
jest.mocked(nodeFetch).mockImplementation(mockFetch);
const tokenProvider = generateTokenProvider({
    AUTH0_DOMAIN: 'example.com',
    AUTH0_CLIENT_ID: 'client-id',
    AUTH0_CLIENT_SECRET: 'client-secret',
});
describe('TokenProvider', function () {
    beforeEach(function () {
        jest.clearAllMocks();
        tokenProvider.clearToken();
    });
    it('should return a token', async function () {
        mockFetch.mockResolvedValueOnce({
            json: () => ({
                access_token: 'token',
                expires_in: 1000,
                token_type: 'Bearer',
                scope: 'read:users',
            }),
        });
        const token = await tokenProvider.retrieveToken();
        expect(token).toEqual('token');
    });
    it('if token is expired, should return a new token', async function () {
        mockFetch
            .mockResolvedValueOnce({
                json: () => ({
                    access_token: 'token',
                    expires_in: 1,
                    token_type: 'Bearer',
                    scope: 'read:users',
                }),
            })
            .mockResolvedValueOnce({
                json: () => ({
                    access_token: 'new-token',
                    expires_in: 1000,
                    token_type: 'Bearer',
                    scope: 'read:users',
                }),
            });
        await tokenProvider.retrieveToken();
        await sleep(1000);
        const newToken = await tokenProvider.retrieveToken();
        expect(newToken).toEqual('new-token');
    });
});
