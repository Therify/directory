import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { RBACOptions } from '../rbacOptions';
import { isCoach } from '../role-validators';
import { defaultRedirect } from './constants';

export const requireCoachAuth =
    (
        authCallback: GetServerSideProps,
        options?: RBACOptions
    ): GetServerSideProps =>
    async (context) => {
        const { userRoles } = parseCookies(context);
        if (!isCoach(userRoles)) {
            return {
                redirect: options?.redirect ?? defaultRedirect,
            };
        }
        return authCallback(context);
    };
