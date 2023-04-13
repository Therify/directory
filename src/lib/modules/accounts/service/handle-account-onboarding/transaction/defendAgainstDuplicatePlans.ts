import { HandleAccountOnboarding } from '@/lib/modules/onboarding/features';

import { HandleAccountOnboardingTransaction } from './definition';

export const factory = (
    input: HandleAccountOnboarding.Input
): HandleAccountOnboardingTransaction['defendAgainstDuplicatePlans'] => ({
    async commit({ prisma }, { handleAccountEntity: { accountId } }) {
        const plan = await prisma.plan.findFirst({
            where: {
                accountId,
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
