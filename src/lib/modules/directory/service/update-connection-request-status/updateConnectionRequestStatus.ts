import { DirectoryServiceParams } from '../params';
import { UpdateConnectionRequestStatus } from '@/lib/modules/directory/features';
import { ConnectionStatus } from '@prisma/client';

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

        if (connectionStatus === ConnectionStatus.terminated) {
            throw new Error(
                // TODO: We need to be able to handle this without breaking confidentiality
                'Cannot terminate a connection requests at this time.'
            );
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
