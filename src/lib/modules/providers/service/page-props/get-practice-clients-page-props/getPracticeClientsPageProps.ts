import { AccountsService } from '@/lib/modules/accounts/service';
import {
    AccountSchema,
    ConnectionRequestSchema,
    MemberProfileSchema,
    PracticeProfileSchema,
    PracticeSchema,
    ProviderProfileSchema,
    UserSchema,
} from '@/lib/shared/schema';
import { TherifyUser } from '@/lib/shared/types';
import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { z } from 'zod';
import { ProvidersServiceParams } from '../../params';

const queryResultSchema = PracticeProfileSchema.extend({
    practice: PracticeSchema,
    profile: ProviderProfileSchema.extend({
        ConnectionRequest: z
            .array(
                ConnectionRequestSchema.extend({
                    member: UserSchema.extend({
                        account: AccountSchema.nullable(),
                        memberProfile: MemberProfileSchema,
                    }),
                })
            )
            .nullable(),
    }),
}).array();

type QueryResult = z.infer<typeof queryResultSchema>;

const practiceConnectionRequestViewSchema = z.object({
    connectionRequestStatus: ConnectionRequestSchema.shape.connectionStatus,
    memberId: z.string(),
    providerFirstName: z.string(),
    providerLastName: z.string(),
    memberFirstName: z.string(),
    memberLastName: z.string(),
    memberEmailAddress: z.string(),
    practiceName: z.string(),
    practiceEmailAddress: z.string(),
    memberState: z.string(),
    memberAccountName: z.string(),
    memberConcerns: z.string().array(),
    memberGoals: z.string().array(),
    memberConnectionMessage: z.string(),
});

type PracticeConnectionRequestView = z.infer<
    typeof practiceConnectionRequestViewSchema
>;

function toPracticeConnectionRequestView(
    queryResult: QueryResult
): PracticeConnectionRequestView[] {
    let results: PracticeConnectionRequestView[] = [];
    for (const practiceProfile of queryResult) {
        const { ConnectionRequest } = practiceProfile.profile;
        const connectionRequestView = (ConnectionRequest ?? []).map(
            (connectionRequest) => {
                return {
                    memberId: connectionRequest.member.id,
                    connectionRequestStatus: connectionRequest.connectionStatus,
                    providerFirstName: practiceProfile.profile.givenName,
                    providerLastName: practiceProfile.profile.surname,
                    memberFirstName: connectionRequest.member.givenName,
                    memberLastName: connectionRequest.member.surname,
                    memberEmailAddress: connectionRequest.member.emailAddress,
                    practiceName: practiceProfile.practice.name,
                    practiceEmailAddress: practiceProfile.practice.email,
                    memberState: connectionRequest.member.memberProfile.state,
                    memberAccountName: connectionRequest.member.account?.name,
                    memberConcerns:
                        connectionRequest.member.memberProfile.concerns,
                    memberGoals: connectionRequest.member.memberProfile.goals,
                    memberConnectionMessage:
                        connectionRequest.connectionMessage,
                };
            }
        );
        // @ts-ignore
        results = results.concat(connectionRequestView);
    }
    return results;
}

export interface PracticeClientsPageProps {
    connectionRequests: PracticeConnectionRequestView[];
    user: TherifyUser.TherifyUser;
}

interface GetPracticeClientsPagePropsParams extends ProvidersServiceParams {
    accountsService: AccountsService;
}

export const factory = ({
    accountsService,
    prisma,
}: GetPracticeClientsPagePropsParams) => {
    const getPracticeClientsPageProps: GetServerSideProps<
        PracticeClientsPageProps
    > = async (context) => {
        const session = await getSession(context.req, context.res);
        if (!session) {
            return {
                redirect: {
                    destination: '/api/auth/login',
                    permanent: false,
                },
            };
        }
        const [user, practiceProfiles] = await Promise.all([
            accountsService.getUserDetailsById({
                userId: session.user.sub,
            }),
            prisma.practiceProfile.findMany({
                where: {
                    practice: {
                        userId: session.user.sub,
                    },
                },
                select: {
                    practice: true,
                    profile: {
                        include: {
                            ConnectionRequest: {
                                include: {
                                    member: {
                                        include: {
                                            account: true,
                                            memberProfile: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            }),
        ]);
        return {
            props: JSON.parse(
                JSON.stringify({
                    user,
                    connectionRequests: toPracticeConnectionRequestView(
                        practiceProfiles as QueryResult
                    ),
                })
            ),
        };
    };
    return getPracticeClientsPageProps;
};
