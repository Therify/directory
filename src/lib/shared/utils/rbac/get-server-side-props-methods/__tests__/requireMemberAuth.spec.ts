import { Role } from '@prisma/client';
import { parseCookies } from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { requireMemberAuth } from '../requireMemberAuth';
import { defaultRedirect } from '../constants';

jest.mock('nookies', () => {
    return { parseCookies: jest.fn() };
});

describe('requireMemberAuth', () => {
    const mockContext = {
        req: { headers: { host: 'localhost' } },
    } as GetServerSidePropsContext;
    it('should return the authCallback result if the user is a member', async () => {
        jest.mocked(parseCookies).mockImplementationOnce(() => ({
            userRoles: Role.member,
        }));
        const authCallback = jest.fn();
        authCallback.mockReturnValue('return value');
        const result = await requireMemberAuth(authCallback)(mockContext);
        expect(authCallback).toHaveBeenCalledWith(mockContext);
        expect(result).toEqual('return value');
    });

    it('should return default redirect if the user is not a member', async () => {
        jest.mocked(parseCookies).mockReturnValueOnce({
            userRoles: Role.provider_coach,
        });
        const result = await requireMemberAuth(jest.fn())(mockContext);
        expect(result).toEqual({
            redirect: defaultRedirect,
        });
    });

    it('should return a custom redirect', async () => {
        jest.mocked(parseCookies).mockReturnValueOnce({
            userRoles: Role.provider_coach,
        });
        const redirect = {
            destination: '/custom-redirect',
            permanent: true,
        };
        const result = await requireMemberAuth(jest.fn(), {
            redirect,
        })(mockContext);
        expect(result).toEqual({
            redirect,
        });
    });
});
