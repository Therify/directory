import { GetServerSideProps } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

import { URL_PATHS } from '@/lib/sitemap';
import { TherifyUser } from '@/lib/shared/types';
import { AccountsService } from '@/lib/modules/accounts/service';
import { ProvidersServiceParams } from '../../params';
import { Role } from '@prisma/client';
import { GetProviderTherifyUser } from '../../get-provider-therify-user';

export interface ProviderDashboardProps {
    user: TherifyUser.TherifyUser;
}

export const factory = (params: ProvidersServiceParams) => {
    const getProviderDashboardProps: GetServerSideProps<
        ProviderDashboardProps
    > = async (context) => {
        const session = await getSession(context.req, context.res);
        if (!session) {
            return {
                redirect: {
                    destination: URL_PATHS.AUTH.LOGIN,
                    permanent: false,
                },
            };
        }
        const getUserDetails = GetProviderTherifyUser.factory(params);
        const { user } = await getUserDetails({
            userId: session.user.sub,
        });
        if (!user) {
            return {
                redirect: {
                    destination: URL_PATHS.AUTH.LOGIN,
                    permanent: false,
                },
            };
        }
        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
            },
        };
    };
    return getProviderDashboardProps;
};
