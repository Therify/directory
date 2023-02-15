import { GetServerSideProps } from 'next';
import { ProviderPractice, ProviderProfile } from '@/lib/shared/types';
import { TherifyUser } from '@/lib/shared/types/therify-user';
import { getSession } from '@auth0/nextjs-auth0';
import { URL_PATHS } from '@/lib/sitemap';
import { Role } from '@prisma/client';
import { ProvidersServiceParams } from '../../../params';
import { practiceFactory } from '../../../practice';
import { GetProviderTherifyUser } from '../../../get-provider-therify-user';
import { profilesFactory } from '../../../profiles';

export interface PracticeProfileEditorPageProps {
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
        const { profileId: rawProfileId } = context.params ?? {};
        const profileId = Array.isArray(rawProfileId)
            ? rawProfileId[0]
            : rawProfileId;

        if (!profileId) {
            return {
                notFound: true,
            };
        }

        const getUserDetails = GetProviderTherifyUser.factory(params);
        const { getPracticeByUserId } = practiceFactory(params);
        const { getProfileById } = profilesFactory(params);

        const [{ user }, { practice }, { profile }] = await Promise.all([
            getUserDetails({ userId: session.user.sub }),
            getPracticeByUserId({ userId: session.user.sub }),
            getProfileById({ profileId: context.query.profileId as string }),
        ]);
        if (user === null) {
            return {
                redirect: {
                    destination: URL_PATHS.AUTH.LOGIN,
                    permanent: false,
                },
            };
        }
        if (!user.isPracticeAdmin) {
            const isTherapist = user.roles.includes(Role.provider_therapist);
            return {
                redirect: {
                    destination: isTherapist
                        ? URL_PATHS.PROVIDERS.THERAPIST.DASHBOARD
                        : URL_PATHS.PROVIDERS.COACH.DASHBOARD,
                    permanent: false,
                },
            };
        }
        if (!profile) {
            return {
                notFound: true,
            };
        }
        const props: PracticeProfileEditorPageProps = {
            practice,
            profile,
            user,
        };
        return JSON.parse(JSON.stringify({ props }));
    };
    return getPracticeProfileEditorPageProps;
};
