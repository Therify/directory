import { GetServerSideProps } from 'next';
import { ProviderPractice } from '@/lib/shared/types';
import { TherifyUser } from '@/lib/shared/types/therify-user';
import { getSession } from '@auth0/nextjs-auth0';
import { URL_PATHS } from '@/lib/sitemap';
import { Role } from '@prisma/client';
import { ProvidersServiceParams } from '../../../params';
import { practiceFactory } from '../../../practice';
import { GetProviderTherifyUser } from '../../../get-provider-therify-user';

export interface PracticeCreateProfilePageProps {
    practice: ProviderPractice.Type;
    user: TherifyUser.TherifyUser;
}

export const factory = (params: ProvidersServiceParams) => {
    const getPracticeCreateProfilePageProps: GetServerSideProps<
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
        const { getPracticeByUserId } = practiceFactory(params);

        const [{ user }, { practice }] = await Promise.all([
            getUserDetails({ userId: session.user.sub }),
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
        const props: PracticeCreateProfilePageProps = {
            practice,
            user,
        };
        return JSON.parse(JSON.stringify({ props }));
    };
    return getPracticeCreateProfilePageProps;
};
