import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { RBACOptions } from '../rbacOptions';
import { isTherapist } from '../role-validators';
import { defaultRedirect } from './constants';

export const requireTherapistAuth =
    (
        authCallback: GetServerSideProps,
        options?: RBACOptions
    ): GetServerSideProps =>
    async (context) => {
        const { userRoles } = parseCookies(context);
        if (!isTherapist(userRoles)) {
            return {
                redirect: options?.redirect ?? defaultRedirect,
            };
        }
        return authCallback(context);
    };
