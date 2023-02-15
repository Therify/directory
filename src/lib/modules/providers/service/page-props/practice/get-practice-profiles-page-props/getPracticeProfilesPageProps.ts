import { ProviderProfileListing } from '@/lib/shared/types';
import { TherifyUser } from '@/lib/shared/types/therify-user';
import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { profilesFactory } from '@/lib/modules/providers/service/profiles';
import { URL_PATHS } from '@/lib/sitemap';
import { ProvidersServiceParams } from '../../../params';
import { GetProviderTherifyUser } from '../../../get-provider-therify-user';
import { practiceFactory } from '../../../practice';
import { Role } from '@prisma/client';

export interface PracticeProfilesPageProps {
    profiles: ProviderProfileListing.Type[];
    practice: { id: string; name: string };
    user: TherifyUser.TherifyUser;
}

export const factory = (params: ProvidersServiceParams) => {
    const getPracticeProfilesPageProps: GetServerSideProps<
        PracticeProfilesPageProps
    > = async (context) => {
        console.log('gettting PracticeProfilesPageProps...');
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
        const { listPracticeProfilesByUserId } = profilesFactory(params);
        const { getPracticeByUserId } = practiceFactory(params);

        const [{ user }, { profiles }, { practice }] = await Promise.all([
            getUserDetails({ userId: session.user.sub }),
            listPracticeProfilesByUserId({ userId: session.user.sub }),
            getPracticeByUserId({ userId: session.user.sub }),
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
        const props: PracticeProfilesPageProps = {
            profiles,
            practice,
            user,
        };
        return JSON.parse(JSON.stringify({ props }));
    };
    return getPracticeProfilesPageProps;
};
