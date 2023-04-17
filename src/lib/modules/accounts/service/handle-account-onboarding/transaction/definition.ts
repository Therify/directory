import { z } from 'zod';
import { TransactionV1 } from '@/lib/shared/utils';
import { AccountsServiceParams as Context } from '../../params';

export const transactionDefinition = z.object({
    getUserDetails: z.object({
        stripeCustomerId: z.string(),
        userId: z.string(),
        managedAccountId: z.string().optional(),
    }),
    handleAccountEntity: z.object({
        accountId: z.string(),
        created: z.boolean(),
    }),
    defendAgainstDuplicatePlans: z.object({
        hasPlan: z.boolean(),
    }),
    handleRegistrationCode: z.object({
        registrationCode: z.string().optional(),
        created: z.boolean(),
    }),
    createStripeCheckoutSession: z.object({
        checkoutSessionId: z.string(),
        checkoutSessionUrl: z.string(),
    }),
});

export type HandleAccountOnboardingTransaction =
    TransactionV1.TransactionDefinition<
        Context,
        typeof transactionDefinition.shape
    >;
