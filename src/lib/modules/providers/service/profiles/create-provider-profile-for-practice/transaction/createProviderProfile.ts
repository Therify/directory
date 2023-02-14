import { CreateProviderProfileForPractice } from '@/lib/modules/providers/features/profiles';
import { ProviderProfileSchema } from '@/lib/shared/schema';
import { ProviderSupervisor, ProviderCredential } from '@/lib/shared/types';
import { CreateProviderProfileForPracticeTransaction } from './definition';

export const factory: (
    input: CreateProviderProfileForPractice.Input
) => CreateProviderProfileForPracticeTransaction['createProviderProfile'] = ({
    profile: {
        supervisor: rawSupervisor,
        credentials: rawCredentials,
        practiceStartDate,
        ...rawProfile
    },
}) => {
    return {
        async commit({ prisma }) {
            const supervisor = rawSupervisor
                ? ProviderSupervisor.validate(rawSupervisor)
                : null;
            const credentials = rawCredentials.map(ProviderCredential.validate);

            const profile = {
                ...rawProfile,
                supervisor,
                practiceStartDate: practiceStartDate
                    ? new Date(practiceStartDate)
                    : null,
                credentials,
            };
            const { id: profileId } = await prisma.providerProfile.create({
                data: {
                    ...ProviderProfileSchema.omit({
                        // Only require id validation if the id exists on the payload.
                        // This allows us to parse `create` and `update` profile payloads here.
                        ...(profile.id ? {} : { id: true }),
                        createdAt: true,
                        updatedAt: true,
                        supervisor: true,
                    }).parse(profile),
                },
            });

            return {
                profileId,
            };
        },
        rollback({ prisma }, { createProviderProfile: { profileId } }) {
            return prisma.providerProfile.delete({
                where: { id: profileId },
            });
        },
    };
};
