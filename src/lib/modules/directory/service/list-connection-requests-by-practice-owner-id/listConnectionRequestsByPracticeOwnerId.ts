import { ListConnectionRequestsByPracticeOwnerId } from '@/lib/modules/directory/features';
import {
    ConnectionRequest,
    PracticeProfileConnectionRequests,
} from '@/lib/shared/types';
import { getRemainingSessionCount } from '@/lib/shared/utils';
import { DirectoryServiceParams } from '../params';

export function factory({ prisma }: DirectoryServiceParams) {
    return async function listConnectionRequestsByPracticeOwnerId({
        practiceOwnerId,
        status,
    }: ListConnectionRequestsByPracticeOwnerId.Input): Promise<PracticeProfileConnectionRequests.Type> {
        const practice = await prisma.practice.findFirstOrThrow({
            where: {
                practiceOwnerId,
            },
            select: {
                name: true,
                email: true,
                id: true,
                practiceProfile: {
                    select: {
                        profile: {
                            select: {
                                id: true,
                                givenName: true,
                                surname: true,
                                profileImageUrl: true,
                                designation: true,
                                contactEmail: true,
                            },
                        },
                    },
                },
            },
        });
        const { practiceProfile: practiceProfiles } = practice;
        const connectionRequests = await prisma.connectionRequest.findMany({
            where: {
                profileId: {
                    in: practiceProfiles.map((p) => p.profile.id),
                },
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
                    },
                },
            },
        });

        const profilesById = practiceProfiles.reduce<
            Record<string, (typeof practiceProfiles)[number]['profile']>
        >((acc, { profile }) => {
            return {
                ...acc,
                [profile.id]: profile,
            };
        }, {});

        const connectionsByProfileId = connectionRequests.reduce<
            Record<string, typeof connectionRequests>
        >((acc, connection) => {
            if (acc[connection.providerProfile.id] === undefined) {
                return {
                    ...acc,
                    [connection.providerProfile.id]: [connection],
                };
            }
            return {
                ...acc,
                [connection.providerProfile.id]: [
                    ...acc[connection.providerProfile.id],
                    connection,
                ],
            };
        }, {});

        return PracticeProfileConnectionRequests.validate({
            practice,
            profileConnectionRequests: Object.entries(connectionsByProfileId)
                .map(([profileId, connectionRequests]) => ({
                    providerProfile: profilesById[profileId],
                    connectionRequests: connectionRequests
                        .map((connection) => {
                            const rawPlan = connection.member.account?.plans[0];
                            let plan: ConnectionRequest.Type['member']['plan'] =
                                null;
                            if (rawPlan) {
                                const {
                                    coveredSessions,
                                    endDate,
                                    startDate,
                                    ...planDetails
                                } = rawPlan;
                                plan = {
                                    ...planDetails,
                                    startDate: startDate.toISOString(),
                                    endDate: endDate.toISOString(),
                                    coveredSessions,
                                    remainingSessions: getRemainingSessionCount(
                                        { coveredSessions, endDate, startDate },
                                        connection.member.redeemedSessions
                                    ),
                                };
                            }
                            return {
                                ...connection,
                                member: {
                                    ...connection.member,
                                    plan,
                                },
                            };
                        })
                        .sort((a, b) => {
                            return a.member.givenName.localeCompare(
                                b.member.givenName
                            );
                        }),
                }))
                .sort((a, b) => {
                    return a.providerProfile.givenName.localeCompare(
                        b.providerProfile.givenName
                    );
                }),
        });
    };
}
