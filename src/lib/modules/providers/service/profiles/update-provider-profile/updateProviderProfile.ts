import { ProvidersServiceParams } from '../../params';
import { UpdateProviderProfile } from '@/lib/modules/providers/features/profiles';
import { ProviderSupervisor, ProviderCredential } from '@/lib/shared/types';
import { ProviderProfileSchema } from '@/lib/shared/schema';

export function factory({ prisma }: ProvidersServiceParams) {
    return async function ({
        userId,
        profile: {
            credentials: rawCredentials,
            supervisor: rawSupervisor,
            practiceStartDate,
            ...rawProfile
        },
    }: UpdateProviderProfile.Input): Promise<{
        success: UpdateProviderProfile.Output['success'];
    }> {
        const { userId: profileOwnerId, practiceProfile } =
            await prisma.providerProfile.findUniqueOrThrow({
                where: {
                    id: rawProfile.id,
                },
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
            });

        const practiceOwnerId = practiceProfile?.practice?.practiceOwnerId;
        const isUserPracticeOwner =
            Boolean(practiceOwnerId) && practiceOwnerId === userId;
        const isUserProfileOwner =
            Boolean(profileOwnerId) && userId === profileOwnerId;
        const canEditProfile = isUserPracticeOwner || isUserProfileOwner;

        if (!canEditProfile) {
            throw new Error('User cannot edit this profile.');
        }
        const supervisor = rawSupervisor
            ? ProviderSupervisor.validate(rawSupervisor)
            : {};
        const credentials = rawCredentials.map(ProviderCredential.validate);

        const profile = {
            ...rawProfile,
            practiceStartDate: practiceStartDate && new Date(practiceStartDate),
            credentials,
            supervisor,
        };
        const payload = ProviderProfileSchema.omit({
            createdAt: true,
            updatedAt: true,
        }).parse(profile);

        await prisma.providerProfile.update({
            where: { id: profile.id },
            data: { ...payload },
        });

        return {
            success: true,
        };
    };
}
