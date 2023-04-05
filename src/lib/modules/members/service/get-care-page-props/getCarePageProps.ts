import { GenerateRecommendations } from '@/lib/modules/directory/features';
import { DirectoryService } from '@/lib/modules/directory/service';
import { TherifyUser } from '@/lib/shared/types';
import { ProviderProfile } from '@/lib/shared/types/provider-profile/providerProfile';
import { SelfAssessment } from '@/lib/shared/types/self-assessment';
import { isAtRisk } from '@/lib/shared/types/self-assessment/is-at-risk/isAtRisk';
import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { GetMemberTherifyUser } from '../get-member-therify-user';
import { MembersServiceParams } from '../params';

export interface CarePageProps {
    user: TherifyUser.TherifyUser;
    recommendations?: {
        coaches: ProviderProfile[];
        idealMatches: ProviderProfile[];
        ethnicMatches: ProviderProfile[];
        genderMatches: ProviderProfile[];
        concernsMatches: ProviderProfile[];
    };
}

export interface GetCarePagePropsParams extends MembersServiceParams {
    directoryService: DirectoryService;
}

export const factory = (params: GetCarePagePropsParams) => {
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
        console.info('Validating if member is at risk...');
        const isMemberAtRisk = await isAtRisk(context);
        if (isMemberAtRisk) {
            return {
                redirect: {
                    destination: '/members/request-appointment',
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
        const selfAssessment = await params.prisma.selfAssessment.findFirst({
            where: {
                userId: user.userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 1,
        });
        if (!selfAssessment) {
            return {
                redirect: {
                    destination: '/members/care/self-assessment',
                    permanent: false,
                },
            };
        }
        const result = await params.directoryService.generateRecommendations({
            memberId: user.userId,
            selfAssessment: SelfAssessment.validate(selfAssessment),
        });
        if (result.success) {
            return {
                props: {
                    user: JSON.parse(JSON.stringify(user)),
                    recommendations: result.payload,
                },
            };
        }
        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
                recommendations: undefined,
            },
        };
    };
    return getCarePageProps;
};
