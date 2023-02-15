import { ProvidersServiceParams } from '../../params';
import { UpdateDirectoryListing } from '@/lib/modules/providers/features/profiles';

export function factory({ prisma }: ProvidersServiceParams) {
    return async function ({
        userId,
        profileId,
        status,
    }: UpdateDirectoryListing.Input): Promise<{
        success: UpdateDirectoryListing.Output['success'];
    }> {
        const { managedPractice } = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
            select: {
                managedPractice: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        if (!managedPractice) {
            throw new Error('User is not a practice owner.');
        }

        const { count } = await prisma.directoryListing.updateMany({
            where: {
                practiceId: managedPractice.id,
                providerProfileId: profileId,
            },
            data: {
                status,
            },
        });
        if (count === 0) {
            throw new Error(
                'Directory listing not updated. Update count is 0.'
            );
        }

        return {
            success: count > 0,
        };
    };
}
