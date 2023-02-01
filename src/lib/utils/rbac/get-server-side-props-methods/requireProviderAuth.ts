import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { RBACOptions } from '../rbacOptions';
import { isProvider } from '../role-validators';
import { defaultRedirect } from './constants';

export const requireProviderAuth =
    (
        authCallback: GetServerSideProps,
        options?: RBACOptions
    ): GetServerSideProps =>
    async (context) => {
        const { userRoles } = parseCookies(context);
        if (!isProvider(userRoles)) {
            return {
                redirect: options?.redirect ?? defaultRedirect,
            };
        }
        return authCallback(context);
    };
