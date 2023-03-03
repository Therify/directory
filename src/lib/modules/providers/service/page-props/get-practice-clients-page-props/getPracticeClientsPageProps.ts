import { directoryService } from '@/lib/modules/directory/service';
import {
    TherifyUser,
    PracticeProfileConnectionRequests,
} from '@/lib/shared/types';
import { URL_PATHS } from '@/lib/sitemap';
import { getSession } from '@auth0/nextjs-auth0';
import { ConnectionStatus } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { GetProviderTherifyUser } from '../../get-provider-therify-user';
import { ProvidersServiceParams } from '../../params';

export interface PracticeClientsPageProps {
    practiceConnectionRequests: PracticeProfileConnectionRequests.Type;
    user: TherifyUser.TherifyUser;
}

export const factory = (params: ProvidersServiceParams) => {
    const getPracticeClientsPageProps: GetServerSideProps<
        PracticeClientsPageProps
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
        const [{ user }, practiceConnectionRequests] = await Promise.all([
            getUserDetails({
                userId: session.user.sub,
            }),
            directoryService.listConnectionRequestsByPracticeOwnerId({
                practiceOwnerId: session.user.sub,
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
        const props: PracticeClientsPageProps = {
            practiceConnectionRequests,
            user,
        };
        return {
            props: JSON.parse(JSON.stringify(props)),
        };
    };
    return getPracticeClientsPageProps;
};
