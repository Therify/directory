import { GetProviderProfileByUserId } from '@/lib/modules/providers/features/profiles';
import { ProviderProfile } from '@/lib/shared/types';
import { Role } from '@prisma/client';
import { ProvidersServiceParams } from '../../params';

export const factory =
    ({ prisma }: ProvidersServiceParams) =>
    async ({
        userId,
    }: GetProviderProfileByUserId.Input): Promise<{
        profile: GetProviderProfileByUserId.Output['profile'];
    }> => {
        const { roles, providerProfile } = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
            select: {
                roles: true,
                providerProfile: true,
            },
        });
        if (
            !roles.includes(Role.provider_coach) &&
            !roles.includes(Role.provider_therapist)
        ) {
            throw new Error('User is not a provider.');
        }
        if (providerProfile === null) {
            return { profile: null };
        }

        return {
            profile: ProviderProfile.validate(providerProfile),
        };
    };
