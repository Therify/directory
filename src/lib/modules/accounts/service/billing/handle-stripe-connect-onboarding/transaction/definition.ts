import * as z from 'zod';
import { TransactionDefinition } from '@/lib/shared/utils/transaction/transaction.v1';
import { AccountsServiceParams as Context } from '../../../params';

export const handleStripeConnectOnboardingTransactionDefinition = z.object({
    getUserDetails: z.object({
        user: z.object({
            givenName: z.string(),
            surname: z.string(),
            dateOfBirth: z.date(),
            emailAddress: z.string(),
        }),
        providerProfile: z.object({
            id: z.string(),
            minimumRate: z.number(),
            givenName: z.string(),
            surname: z.string(),
        }),
        stripeConnectAccountId: z.string().optional(),
    }),
    createStripeConnectAccount: z.object({
        stripeConnectAccountId: z.string(),
    }),
    addStripeConnectAccountToUser: z.unknown(),
    createCoachProduct: z.object({
        priceId: z.string(),
    }),
    addCoachPriceIdToProfile: z.unknown(),
    createOnbordingUrl: z.object({
        stripeConnectOnboardingUrl: z.string(),
    }),
});

export type HandleStripeConnectOnboardingTransaction = TransactionDefinition<
    Context,
    typeof handleStripeConnectOnboardingTransactionDefinition.shape
>;
