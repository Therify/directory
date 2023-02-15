import { GetServerSideProps } from 'next';
import { ProviderPractice, ProviderProfile } from '@/lib/shared/types';
import { TherifyUser } from '@/lib/shared/types/therify-user';
import { getSession } from '@auth0/nextjs-auth0';
import { URL_PATHS } from '@/lib/sitemap';
import { Role } from '@prisma/client';
import { ProvidersServiceParams } from '../../params';
import { practiceFactory } from '../../practice';
import { GetProviderTherifyUser } from '../../get-provider-therify-user';
import { profilesFactory } from '../../profiles';

export interface ProviderProfileEditorPageProps {
    practice: ProviderPractice.Type;
    user: TherifyUser.TherifyUser;
    profile: ProviderProfile.ProviderProfile;
}

export const factory = (params: ProvidersServiceParams) => {
    const getPracticeProfileEditorPageProps: GetServerSideProps<
        ProvidersServiceParams
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
        const { getPracticeByProviderId } = practiceFactory(params);
        const { getProfileByUserId } = profilesFactory(params);

        const [{ user }, { practice }, { profile }] = await Promise.all([
            getUserDetails({ userId: session.user.sub }),
            getPracticeByProviderId({ userId: session.user.sub }),
            getProfileByUserId({
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
        if (!profile) {
            return {
                notFound: true,
            };
        }
        const props: ProviderProfileEditorPageProps = {
            practice,
            profile,
            user,
        };
        return JSON.parse(JSON.stringify({ props }));
    };
    return getPracticeProfileEditorPageProps;
};
