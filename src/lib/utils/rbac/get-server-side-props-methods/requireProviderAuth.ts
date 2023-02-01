import { URL_PATHS } from '@/lib/sitemap';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { RBACOptions } from '../rbacOptions';
import { isProvider } from '../role-validators';

export const requireProviderAuth =
    (
        authCallback: GetServerSideProps,
        options?: RBACOptions
    ): GetServerSideProps =>
    async (context) => {
        const { userRoles } = parseCookies(context);
        if (!isProvider(userRoles)) {
            return {
                redirect: options?.redirect ?? {
                    destination: URL_PATHS[404],
                    permanent: false,
                },
            };
        }
        return authCallback(context);
    };
