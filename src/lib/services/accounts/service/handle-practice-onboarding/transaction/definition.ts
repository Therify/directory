import { z } from 'zod';
import { TransactionV1 } from '@/lib/utils';
import { AccountsServiceParams as Context } from '../../params';

export const transactionDefinition = z.object({
    getUserDetails: z.object({
        stripeCustomerId: z.string(),
    }),
    createPracticeEntity: z.object({
        practiceId: z.string(),
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
