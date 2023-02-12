import { GetProviderProfileById } from '@/lib/modules/providers/features/profiles';
import { ProviderProfile } from '@/lib/shared/types';
import { Role } from '@prisma/client';
import { ProvidersServiceParams } from '../../params';

export const factory =
    ({ prisma }: ProvidersServiceParams) =>
    async ({
        profileId,
    }: GetProviderProfileById.Input): Promise<{
        profile: GetProviderProfileById.Output['profile'];
    }> => {
        const profile = await prisma.providerProfile.findUniqueOrThrow({
            where: {
                id: profileId,
            },
        });

        return {
            profile: ProviderProfile.validate({
                ...profile,
                practiceStartDate: profile.practiceStartDate?.toISOString(),
            }),
        };
    };
