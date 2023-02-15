import { TherifyUser } from '@/lib/shared/types/therify-user';
import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { ProvidersServiceParams } from '../../params';
import { GetProviderTherifyUser } from '../../get-provider-therify-user';
import { URL_PATHS } from '@/lib/sitemap';

export interface ProviderTherifyUserPageProps {
    user: TherifyUser.TherifyUser;
}

export const factory = (params: ProvidersServiceParams) => {
    const getProviderTherifyUserPageProps: GetServerSideProps<
        ProviderTherifyUserPageProps
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
        // TODO: Handle firebaseToken
        const props: ProviderTherifyUserPageProps = {
            user,
        };
        return JSON.parse(JSON.stringify({ props }));
    };
    return getProviderTherifyUserPageProps;
};
