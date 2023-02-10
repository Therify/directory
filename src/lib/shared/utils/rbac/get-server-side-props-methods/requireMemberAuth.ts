import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { RBACOptions } from '../rbacOptions';
import { isMember } from '../role-validators';
import { defaultRedirect } from './constants';

export const requireMemberAuth =
    (
        authCallback: GetServerSideProps,
        options?: RBACOptions
    ): GetServerSideProps =>
    async (context) => {
        const { userRoles } = parseCookies(context);
        if (!isMember(userRoles)) {
            return {
                redirect: options?.redirect ?? defaultRedirect,
            };
        }
        return authCallback(context);
    };
