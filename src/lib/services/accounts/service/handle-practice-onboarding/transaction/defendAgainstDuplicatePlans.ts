import { HandlePracticeOnboarding } from '@/lib/features/onboarding';

import { HandlePracticeOnboardingTransaction } from './definition';

export const factory = ({
    auth0UserId,
}: HandlePracticeOnboarding.Input): HandlePracticeOnboardingTransaction['defendAgainstDuplicatePlans'] => ({
    async commit({ prisma }, { getUserDetails: { userId } }) {
        const plan = await prisma.plan.findUnique({
            where: {
                userId,
            },
        });
        if (plan !== null) {
            throw new Error(
                'You already have a plan set up. You can manage your plan in your account settings.'
            );
        }
        return {
            hasPlan: Boolean(plan),
        };
    },
    async rollback() {
        return;
    },
});
