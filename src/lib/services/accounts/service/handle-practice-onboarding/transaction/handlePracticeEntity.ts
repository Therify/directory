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
    id,
}) => {
    return {
        async commit({ prisma }, { getUserDetails: { userId } }) {
            if (id) {
                const { id: practiceId } = await prisma.practice.update({
                    where: {
                        id,
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
                    practiceId,
                };
            }
            const { id: practiceId } = await prisma.practice.create({
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
                practiceId,
            };
        },
        rollback({ prisma }, { handlePracticeEntity: { practiceId } }) {
            if (id === undefined) {
                return prisma.practice.delete({
                    where: {
                        id: practiceId,
                    },
                });
            }
        },
    };
};
