import { z } from 'zod';
import { TransactionV1 } from '@/lib/shared/utils';
import { AccountsServiceParams as Context } from '../../params';

export const transactionDefinition = z.object({
    getUserDetails: z.object({
        stripeCustomerId: z.string(),
        userId: z.string(),
    }),
    handlePracticeEntity: z.object({
        practiceId: z.string(),
        created: z.boolean(),
    }),
    defendAgainstDuplicatePlans: z.object({
        hasPlan: z.boolean(),
    }),
    createStripeCheckoutSession: z.object({
        checkoutSessionId: z.string(),
        checkoutSessionUrl: z.string(),
    }),
});

export type HandlePracticeOnboardingTransaction =
    TransactionV1.TransactionDefinition<
        Context,
        typeof transactionDefinition.shape
    >;
