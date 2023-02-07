import { HandlePracticeOnboarding } from '@/lib/features/onboarding';

import { HandlePracticeOnboardingTransaction } from './definition';

export const factory = ({
    userId: id,
}: HandlePracticeOnboarding.Input): HandlePracticeOnboardingTransaction['getUserDetails'] => ({
    async commit({ prisma }) {
        const { stripeCustomerId, id: userId } =
            await prisma.user.findUniqueOrThrow({
                where: {
                    id,
                },
                select: {
                    stripeCustomerId: true,
                    id: true,
                },
            });
        if (!stripeCustomerId) {
            throw new Error('No Stripe customer id on user.');
        }
        return {
            stripeCustomerId,
            userId,
        };
    },
    async rollback() {
        return;
    },
});
