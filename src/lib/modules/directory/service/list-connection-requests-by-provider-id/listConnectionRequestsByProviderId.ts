import { ListConnectionRequestsByProviderId } from '@/lib/modules/directory/features';
import { ConnectionRequest } from '@/lib/shared/types';
import { getRemainingSessionCount } from '@/lib/shared/utils';
import { DirectoryServiceParams } from '../params';

export function factory({ prisma }: DirectoryServiceParams) {
    return async function listConnectionRequestsByProviderId({
        userId,
        status,
    }: ListConnectionRequestsByProviderId.Input): Promise<
        ConnectionRequest.Type[]
    > {
        const { id: profileId } = await prisma.providerProfile.findFirstOrThrow(
            {
                where: {
                    userId,
                },
                select: {
                    id: true,
                },
            }
        );
        const connectionRequests = await prisma.connectionRequest.findMany({
            where: {
                profileId,
                ...(status
                    ? Array.isArray(status)
                        ? { connectionStatus: { in: status } }
                        : { connectionStatus: status }
                    : {}),
            },
            select: {
                connectionStatus: true,
                connectionMessage: true,
                createdAt: true,
                updatedAt: true,
                member: {
                    select: {
                        id: true,
                        givenName: true,
                        surname: true,
                        emailAddress: true,
                        redeemedSessions: true,
                        memberProfile: {
                            select: {
                                goals: true,
                                state: true,
                                country: true,
                                concerns: true,
                                insurance: true,
                            },
                        },
                        account: {
                            select: {
                                name: true,
                                plans: {
                                    orderBy: {
                                        createdAt: 'desc',
                                    },
                                    take: 1,
                                    select: {
                                        status: true,
                                        startDate: true,
                                        endDate: true,
                                        coveredSessions: true,
                                    },
                                },
                            },
                        },
                    },
                },
                providerProfile: {
                    select: {
                        id: true,
                        givenName: true,
                        surname: true,
                        contactEmail: true,
                        practiceProfile: {
                            select: {
                                practice: {
                                    select: {
                                        name: true,
                                        email: true,
                                        id: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        return connectionRequests.map((rawRequest) => {
            const rawPlan = rawRequest.member.account?.plans?.[0] ?? null;
            let plan: ConnectionRequest.Type['member']['plan'] = null;
            if (rawPlan) {
                const { coveredSessions, endDate, startDate, ...planDetails } =
                    rawPlan;

                plan = {
                    ...planDetails,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                    coveredSessions,
                    remainingSessions: getRemainingSessionCount(
                        { coveredSessions, endDate, startDate },
                        rawRequest.member.redeemedSessions
                    ),
                };
            }
            const practice =
                rawRequest.providerProfile.practiceProfile?.practice;
            const connectionRequest = {
                ...rawRequest,
                member: {
                    ...rawRequest.member,
                    plan,
                },
                providerProfile: {
                    ...rawRequest.providerProfile,
                    practice,
                },
            };
            return ConnectionRequest.validate(connectionRequest);
        });
    };
}
