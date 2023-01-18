import { CreatePractice } from '@/lib/features/onboarding';

import { CreatePracticeTransaction } from './definition';

export const factory = ({
    auth0UserId,
}: CreatePractice.Input): CreatePracticeTransaction['getUserDetails'] => ({
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
