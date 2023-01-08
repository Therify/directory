/**
 * @jest-environment node
 */
jest.mock('node-fetch', () => {
    return jest.fn();
});
import { clearAccessToken, getAccessToken } from './getAccessToken';
import nodeFetch from 'node-fetch';
import { sleep } from '@/lib/utils';

describe('getAccessToken', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        clearAccessToken();
    });
    it('should return access token', async () => {
        const mockResponse = {
            access_token: 'access_token',
            expires_in: 86400,
            token_type: 'Bearer',
            scope: 'read:users',
        };
        const mockJsonPromise = Promise.resolve(mockResponse);
        const mockFetchPromise = Promise.resolve({
            ok: true,
            json: () => mockJsonPromise,
        });
        // @ts-ignore
        jest.mocked(nodeFetch).mockImplementation(() => mockFetchPromise);
        const result = await getAccessToken();
        expect(result).toEqual(mockResponse);
    });
    it('returns a new access token if the current one is expired', async () => {
        const mockResponse = {
            access_token: 'access_token',
            expires_in: 1,
            token_type: 'Bearer',
            scope: 'read:users',
        };
        const secondMockResponse = {
            access_token: 'second_access_token',
            expires_in: 86400,
            token_type: 'Bearer',
            scope: 'read:users',
        };
        const mockJsonPromise = Promise.resolve(mockResponse);
        const mockFetchPromise = Promise.resolve({
            ok: true,
            json: () => mockJsonPromise,
        });
        // @ts-ignore
        jest.mocked(nodeFetch).mockImplementation(() => mockFetchPromise);
        const result = await getAccessToken();
        expect(result).toEqual(mockResponse);
        await sleep(1000);
        const secondMockJsonPromise = Promise.resolve(secondMockResponse);
        const secondMockFetchPromise = Promise.resolve({
            ok: true,
            json: () => secondMockJsonPromise,
        });
        // @ts-ignore
        jest.mocked(nodeFetch).mockImplementation(() => secondMockFetchPromise);
        const result2 = await getAccessToken();
        expect(result2).toEqual(secondMockResponse);
    });
});
