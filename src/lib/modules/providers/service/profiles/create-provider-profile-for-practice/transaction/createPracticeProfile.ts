import { CreateProviderProfileForPracticeTransaction } from './definition';

export const step: CreateProviderProfileForPracticeTransaction['createPracticeProfile'] =
    {
        async commit(
            { prisma },
            {
                validateSeatAvailabilityForPractice: { practiceId },
                createProviderProfile: { profileId },
            }
        ) {
            await prisma.practiceProfile.create({
                data: {
                    practiceId,
                    profileId,
                },
            });

            return {
                success: true,
            };
        },
        rollback(
            { prisma },
            {
                validateSeatAvailabilityForPractice: { practiceId },
                createProviderProfile: { profileId },
            }
        ) {
            return prisma.practiceProfile.delete({
                where: { practiceId_profileId: { practiceId, profileId } },
            });
        },
    };
