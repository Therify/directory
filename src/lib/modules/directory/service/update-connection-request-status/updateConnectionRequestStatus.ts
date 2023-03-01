import { DirectoryServiceParams } from '../params';
import { UpdateConnectionRequestStatus } from '@/lib/modules/directory/features';

export function factory({ prisma, messaging }: DirectoryServiceParams) {
    return async function ({
        profileId,
        memberId,
        userId,
        connectionStatus,
    }: UpdateConnectionRequestStatus.Input): Promise<
        Omit<UpdateConnectionRequestStatus.Output, 'errors'>
    > {
        const connectionRequest =
            await prisma.connectionRequest.findFirstOrThrow({
                where: {
                    memberId,
                    profileId,
                },
                select: {
                    providerProfile: {
                        select: {
                            userId: true,
                            practiceProfile: {
                                select: {
                                    practice: {
                                        select: {
                                            practiceOwnerId: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
        const profileOwnerId = connectionRequest.providerProfile.userId;
        const practiceOwnerId =
            connectionRequest.providerProfile?.practiceProfile?.practice
                ?.practiceOwnerId;

        const isProfileOwner = !!profileOwnerId && profileOwnerId === userId;
        const isPracticeOwner = !!practiceOwnerId && practiceOwnerId === userId;
        if (!isProfileOwner && !isPracticeOwner) {
            throw new Error('User cannot perform this action.');
        }

        await prisma.connectionRequest.update({
            where: {
                memberId_profileId: {
                    memberId,
                    profileId,
                },
            },
            data: {
                connectionStatus,
            },
        });
        await messaging.createChannel({
            memberId,
            profileId,
        });
        return {
            success: true,
        };
    };
}
