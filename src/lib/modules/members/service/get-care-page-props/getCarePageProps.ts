import { TherifyUser } from '@/lib/shared/types';
import { ProviderProfile } from '@/lib/shared/types/provider-profile/providerProfile';
import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { GetMemberTherifyUser } from '../get-member-therify-user';
import { MembersServiceParams } from '../params';

export interface CarePageProps {
    user: TherifyUser.TherifyUser;
    recommendations?: ProviderProfile[];
}

export const factory = (params: MembersServiceParams) => {
    const getCarePageProps: GetServerSideProps<CarePageProps> = async (
        context
    ) => {
        const session = await getSession(context.req, context.res);
        if (!session) {
            return {
                redirect: {
                    destination: '/api/auth/login',
                    permanent: false,
                },
            };
        }
        const getTherifyUser = GetMemberTherifyUser.factory(params);
        const { user } = await getTherifyUser({
            userId: session.user.sub,
        });
        if (!user) {
            return {
                redirect: {
                    destination: '/api/auth/login',
                    permanent: false,
                },
            };
        }
        const hasCompletedSelfAssessment =
            (await params.prisma.selfAssessment.count({
                where: {
                    userId: user.userId,
                },
            })) > 0;
        if (!hasCompletedSelfAssessment) {
            return {
                redirect: {
                    destination: '/members/care/self-assessment',
                    permanent: false,
                },
            };
        }
        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
                recommendations: [],
            },
        };
    };
    return getCarePageProps;
};
