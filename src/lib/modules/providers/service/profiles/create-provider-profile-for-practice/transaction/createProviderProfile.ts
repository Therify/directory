import { CreateProviderProfileForPractice } from '@/lib/modules/providers/features/profiles';
import { ProviderProfileSchema } from '@/lib/shared/schema';
import { ProviderSupervisor, ProviderCredential } from '@/lib/shared/types';
import { CreateProviderProfileForPracticeTransaction } from './definition';

export const factory: (
    input: CreateProviderProfileForPractice.Input
) => CreateProviderProfileForPracticeTransaction['createProviderProfile'] = ({
    profile: { supervisor, credentials, ...profile },
}) => {
    return {
        async commit({ prisma }) {
            const { id: profileId } = await prisma.providerProfile.create({
                data: {
                    ...ProviderProfileSchema.omit({
                        ...(profile.id ? {} : { id: true }),
                        supervisor: true,
                        createdAt: true,
                        updatedAt: true,
                    }).parse({
                        ...profile,
                        credentials: credentials.map(
                            ProviderCredential.validate
                        ),
                    }),
                    ...(supervisor
                        ? {
                              supervisor:
                                  ProviderSupervisor.validate(supervisor),
                          }
                        : { supervisor: undefined }),
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
