import { Role } from '@prisma/client';
import { parseCookies } from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { requireCoachAuth } from '../requireCoachAuth';
import { defaultRedirect } from '../constants';

jest.mock('nookies', () => {
    return { parseCookies: jest.fn() };
});

describe('requireCoachAuth', () => {
    const mockContext = {
        req: { headers: { host: 'localhost' } },
    } as GetServerSidePropsContext;
    it('should return the authCallback result if the user is a coach', async () => {
        jest.mocked(parseCookies).mockImplementationOnce(() => ({
            userRoles: Role.provider_coach,
        }));
        const authCallback = jest.fn();
        authCallback.mockReturnValue('return value');
        const result = await requireCoachAuth(authCallback)(mockContext);
        expect(authCallback).toHaveBeenCalledWith(mockContext);
        expect(result).toEqual('return value');
    });

    it('should return default redirect if the user is not a coach', async () => {
        jest.mocked(parseCookies).mockReturnValueOnce({
            userRoles: Role.member,
        });
        const result = await requireCoachAuth(jest.fn())(mockContext);
        expect(result).toEqual({
            redirect: defaultRedirect,
        });
    });

    it('should return a custom redirect', async () => {
        jest.mocked(parseCookies).mockReturnValueOnce({
            userRoles: Role.member,
        });
        const redirect = {
            destination: '/custom-redirect',
            permanent: true,
        };
        const result = await requireCoachAuth(jest.fn(), {
            redirect,
        })(mockContext);
        expect(result).toEqual({
            redirect,
        });
    });
});
