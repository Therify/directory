import { URL_PATHS } from '@/lib/sitemap';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { RBACOptions } from '../rbacOptions';
import { isMember } from '../role-validators';

export const requireMemberAuth =
    (
        authCallback: GetServerSideProps,
        options?: RBACOptions
    ): GetServerSideProps =>
    async (context) => {
        const { userRoles } = parseCookies(context);
        if (!isMember(userRoles)) {
            return {
                redirect: options?.redirect ?? {
                    destination: URL_PATHS[404],
                    permanent: false,
                },
            };
        }
        return authCallback(context);
    };
