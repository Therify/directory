import { ProvidersServiceParams } from '../../params';
import { DeleteProviderProfile } from '@/lib/modules/providers/features/profiles';

export function factory({ prisma }: ProvidersServiceParams) {
    return async function ({
        userId,
        profileId,
    }: DeleteProviderProfile.Input): Promise<{
        success: DeleteProviderProfile.Output['success'];
    }> {
        const { practiceProfile } =
            await prisma.providerProfile.findUniqueOrThrow({
                where: {
                    id: profileId,
                },
                select: {
                    practiceProfile: {
                        select: {
                            practice: {
                                select: {
                                    userId: true,
                                },
                            },
                        },
                    },
                },
            });

        const practiceOwnerId = practiceProfile?.practice?.userId;
        const isUserPracticeOwner =
            Boolean(practiceOwnerId) && practiceOwnerId === userId;

        if (!isUserPracticeOwner) {
            throw new Error('User cannot delete this profile.');
        }

        await prisma.providerProfile.delete({
            where: { id: profileId },
        });

        return {
            success: true,
        };
    };
}
