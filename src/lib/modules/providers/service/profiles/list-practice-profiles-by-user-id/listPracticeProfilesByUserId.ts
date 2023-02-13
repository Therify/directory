import { ProvidersServiceParams } from '../../params';
import { ListPracticeProfilesByUserId } from '@/lib/modules/providers/features/profiles';
import { ProviderProfile } from '@/lib/shared/types';

export function factory({ prisma }: ProvidersServiceParams) {
    return async function ({
        userId,
    }: ListPracticeProfilesByUserId.Input): Promise<{
        profiles: ListPracticeProfilesByUserId.Output['profiles'];
    }> {
        const practice = await prisma.practice.findUnique({
            where: {
                userId,
            },
            select: {
                id: true,
            },
        });
        if (!practice) throw new Error('User is not a practice admin');

        const profiles = await prisma.providerProfile.findMany({
            where: {
                practiceProfile: {
                    practiceId: practice.id,
                },
            },
            include: {
                directoryListing: true,
            },
        });
        return {
            // TODO: This function doesnt need the entire profile
            profiles: JSON.parse(
                JSON.stringify(
                    profiles.map((profile) =>
                        ProviderProfile.validate({
                            ...profile,
                            practiceStartDate:
                                profile.practiceStartDate?.toISOString(),
                        })
                    )
                )
            ),
        };
    };
}
