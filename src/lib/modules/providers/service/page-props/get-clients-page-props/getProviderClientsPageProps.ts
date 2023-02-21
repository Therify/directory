import { directoryService } from '@/lib/modules/directory/service';
import { TherifyUser, ConnectionRequest } from '@/lib/shared/types';
import { URL_PATHS } from '@/lib/sitemap';
import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { GetProviderTherifyUser } from '../../get-provider-therify-user';
import { ProvidersServiceParams } from '../../params';

export interface ProviderClientsPageProps {
    connectionRequests: ConnectionRequest.Type[];
    user: TherifyUser.TherifyUser;
}

export const factory = (params: ProvidersServiceParams) => {
    const getProviderClientsPageProps: GetServerSideProps<
        ProviderClientsPageProps
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
        const [{ user }, connectionRequests] = await Promise.all([
            getUserDetails({
                userId: session.user.sub,
            }),
            directoryService.listConnectionRequestsByProviderId({
                userId: session.user.sub,
            }),
        ]);
        if (user === null) {
            return {
                redirect: {
                    destination: URL_PATHS.AUTH.LOGIN,
                    permanent: false,
                },
            };
        }
        const props: ProviderClientsPageProps = {
            connectionRequests,
            user,
        };
        return {
            props: JSON.parse(JSON.stringify(props)),
        };
    };
    return getProviderClientsPageProps;
};
