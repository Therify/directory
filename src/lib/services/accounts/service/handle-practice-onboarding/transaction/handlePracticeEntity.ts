import { HandlePracticeOnboarding } from '@/lib/features/onboarding';
import type { HandlePracticeOnboardingTransaction } from './definition';

interface HandlePracticeOnboardingEntityFactory {
    (
        params: HandlePracticeOnboarding.Input
    ): HandlePracticeOnboardingTransaction['handlePracticeEntity'];
}

export const factory: HandlePracticeOnboardingEntityFactory = ({
    name,
    address,
    city,
    state,
    zip,
    phone,
    email,
    website,
    practiceId,
}) => {
    return {
        async commit({ prisma }, { getUserDetails: { userId } }) {
            if (practiceId) {
                const { id: foundPracticeId } = await prisma.practice.update({
                    where: {
                        id: practiceId,
                    },
                    data: {
                        name,
                        address,
                        city,
                        state,
                        zip,
                        phone,
                        email,
                        website,
                    },
                });
                return {
                    practiceId: foundPracticeId,
                    created: false,
                };
            }
            const { id: createdPracticeId } = await prisma.practice.create({
                data: {
                    name,
                    address,
                    city,
                    state,
                    zip,
                    phone,
                    email,
                    website,
                    userId,
                },
            });

            return {
                practiceId: createdPracticeId,
                created: true,
            };
        },
        rollback(
            { prisma },
            { handlePracticeEntity: { practiceId, created } }
        ) {
            if (created) {
                return prisma.practice.delete({
                    where: {
                        id: practiceId,
                    },
                });
            }
        },
    };
};
