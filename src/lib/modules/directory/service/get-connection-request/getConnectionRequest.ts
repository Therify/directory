import { GetConnectionRequest } from '@/lib/modules/directory/features';
import { ConnectionRequest } from '@/lib/shared/types';
import { DirectoryServiceParams } from '../params';
import { getCurrentPlan, getRemainingSessionCount } from '@/lib/shared/utils';
import { ConnectionStatus } from '@prisma/client';

export function factory({ prisma }: DirectoryServiceParams) {
    return async function listConnectionRequest({
        providerId,
        memberId,
    }: GetConnectionRequest.Input): Promise<
        GetConnectionRequest.Output['connectionRequest']
    > {
        const { id: profileId } = await prisma.providerProfile.findFirstOrThrow(
            {
                where: {
                    userId: providerId,
                },
                select: {
                    id: true,
                },
            }
        );
        const rawRequest = await prisma.connectionRequest.findFirstOrThrow({
            where: {
                profileId,
                memberId,
                connectionStatus: ConnectionStatus.accepted,
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
                                    take: 3,
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
        const rawPlan = getCurrentPlan(rawRequest.member.account?.plans ?? []);
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
        const practice = rawRequest.providerProfile.practiceProfile?.practice;
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
    };
}
