import { HandlePracticeOnboarding } from '@/lib/features/onboarding';

import { HandlePracticeOnboardingTransaction } from './definition';

export const factory = ({
    auth0UserId,
}: HandlePracticeOnboarding.Input): HandlePracticeOnboardingTransaction['getUserDetails'] => ({
    async commit({ prisma }) {
        const { stripeCustomerId } = await prisma.user.findUniqueOrThrow({
            where: {
                auth0Id: auth0UserId,
            },
            select: {
                stripeCustomerId: true,
            },
        });
        if (!stripeCustomerId) {
            throw new Error('No Stripe customer id on user.');
        }
        return {
            stripeCustomerId,
        };
    },
    async rollback() {
        return;
    },
});
