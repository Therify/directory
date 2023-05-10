import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';

import { HandlePracticeOnboardingTransaction } from './definition';

export const factory = (
    input: HandlePracticeOnboarding.Input
): HandlePracticeOnboardingTransaction['defendAgainstDuplicatePlans'] => ({
    async commit({ prisma }, { handlePracticeEntity: { practiceId } }) {
        const plan = await prisma.plan.findFirst({
            where: {
                practiceId,
            },
        });
        if (plan !== null) {
            throw new Error('You already have a plan set up.');
        }
        return {
            hasPlan: Boolean(plan),
        };
    },
    async rollback() {
        return;
    },
});
