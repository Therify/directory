import { GetProviderProfileByUserId } from '@/lib/features/provider-profiles';
import { Role } from '@prisma/client';
import { AccountsServiceParams } from '../params';

export const factory =
    ({ prisma }: AccountsServiceParams) =>
    async ({
        userId,
    }: GetProviderProfileByUserId.Input): Promise<{
        profile: GetProviderProfileByUserId.Output['profile'];
    }> => {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
            select: {
                roles: true,
                providerProfile: true,
            },
        });
        if (
            !user.roles.includes(Role.provider_coach) &&
            !user.roles.includes(Role.provider_therapist)
        ) {
            throw new Error('User is not a provider.');
        }

        return { profile: user.providerProfile };
    };
