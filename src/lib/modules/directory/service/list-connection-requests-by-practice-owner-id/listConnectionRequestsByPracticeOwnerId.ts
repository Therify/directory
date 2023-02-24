import { ListConnectionRequestsByPracticeOwnerId } from '@/lib/modules/directory/features';
import { PracticeProfileConnectionRequests } from '@/lib/shared/types';
import { DirectoryServiceParams } from '../params';

export function factory({ prisma }: DirectoryServiceParams) {
    return async function listConnectionRequestsByProviderId({
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
                        memberProfile: {
                            select: {
                                goals: true,
                                state: true,
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
            profileConnectionRequests: practiceProfiles.map(
                ({ profile: providerProfile }) => ({
                    providerProfile,
                    connectionRequests:
                        connectionsByProfileId[providerProfile.id],
                })
            ),
        });
    };
}
