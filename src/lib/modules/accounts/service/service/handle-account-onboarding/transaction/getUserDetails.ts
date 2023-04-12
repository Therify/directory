import { HandleAccountOnboarding } from '@/lib/modules/onboarding/features';

import { HandleAccountOnboardingTransaction } from './definition';

export const factory = ({
    billingUserId: id,
}: HandleAccountOnboarding.Input): HandleAccountOnboardingTransaction['getUserDetails'] => ({
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
