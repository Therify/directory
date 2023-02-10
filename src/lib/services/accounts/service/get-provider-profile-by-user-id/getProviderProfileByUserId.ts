import { GetProviderProfileByUserId } from '@/lib/features/provider-profiles';
import { ProviderProfile } from '@/lib/types';
import { Role } from '@prisma/client';
import { AccountsServiceParams } from '../params';

export const factory =
    ({ prisma }: AccountsServiceParams) =>
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

        return { profile: ProviderProfile.validate(providerProfile) };
    };
