import { GetServerSideProps } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

import { URL_PATHS } from '@/lib/sitemap';
import { TherifyUser } from '@/lib/types';
import { AccountsService } from '@/lib/services/accounts';
import { ProvidersServiceParams } from '../../params';
import { Role } from '@prisma/client';

export interface ProviderDashboardProps {
    user: TherifyUser.TherifyUser;
}

interface GetDashboardPropsFactoryParams extends ProvidersServiceParams {
    accountsService: AccountsService;
}

export const factory = ({
    accountsService,
}: GetDashboardPropsFactoryParams) => {
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

        const { user } = await accountsService.getUserDetailsById({
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
