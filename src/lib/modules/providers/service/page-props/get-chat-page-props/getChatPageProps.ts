import { TherifyUser } from '@/lib/shared/types';
import { URL_PATHS } from '@/lib/sitemap/urlPaths';
import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { GetProviderTherifyUser } from '../../get-provider-therify-user';
import { ProvidersServiceParams } from '../../params';

export interface ChatPageProps {
    user: TherifyUser.TherifyUser;
}

export const factory = (params: ProvidersServiceParams) => {
    const getChatPageProps: GetServerSideProps<ChatPageProps> = async (
        context
    ) => {
        const session = await getSession(context.req, context.res);
        if (!session) {
            return {
                redirect: {
                    destination: URL_PATHS.AUTH.LOGIN,
                    permanent: false,
                },
            };
        }
        const getUser = GetProviderTherifyUser.factory(params);
        const { user } = await getUser({ userId: session.user.sub });
        if (user === null) {
            return {
                redirect: {
                    destination: URL_PATHS.AUTH.LOGIN,
                    permanent: false,
                },
            };
        }
        const props: ChatPageProps = {
            user,
        };
        return {
            props: JSON.parse(JSON.stringify(props)),
        };
    };
    return getChatPageProps;
};
