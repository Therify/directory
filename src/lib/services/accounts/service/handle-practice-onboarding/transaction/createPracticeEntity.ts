import { HandlePracticeOnboarding } from '@/lib/features/onboarding';
import type { HandlePracticeOnboardingTransaction } from './definition';

interface HandlePracticeOnboardingEntityFactory {
    (
        params: HandlePracticeOnboarding.Input
    ): HandlePracticeOnboardingTransaction['createPracticeEntity'];
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
}) => {
    return {
        async commit({ prisma }) {
            // TODO: How do we know which user "owns" this practice? (in our data, not the business owner)
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
                },
            });

            return {
                practiceId,
            };
        },
        rollback({ prisma }, { createPracticeEntity: { practiceId: id } }) {
            return prisma.practice.delete({
                where: {
                    id,
                },
            });
        },
    };
};
