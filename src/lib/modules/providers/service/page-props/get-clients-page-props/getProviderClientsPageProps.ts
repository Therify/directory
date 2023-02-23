import { directoryService } from '@/lib/modules/directory/service';
import { TherifyUser, ConnectionRequest } from '@/lib/shared/types';
import { URL_PATHS } from '@/lib/sitemap';
import { getSession } from '@auth0/nextjs-auth0';
import { ConnectionStatus } from '@prisma/client';
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
        // TODO [feat:provider-clients-page]:  Remove this when ready for prod
        if (process.env.NODE_ENV !== 'development') {
            return {
                notFound: true,
            };
        }
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
                status: [ConnectionStatus.pending, ConnectionStatus.accepted],
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
