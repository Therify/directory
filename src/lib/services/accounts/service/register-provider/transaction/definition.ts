import { z } from 'zod';
import { TransactionV1 } from '@/lib/utils';
import { AccountsServiceParams as Context } from '../../params';
import { RegisterProvider } from '@/lib/features/registration';

export const transactionDefinition = z.object({
    createTherifyUserEntity: z.object({
        therifyUserId: z.number(),
    }),
    createAuth0User: z.object({
        auth0UserId: z.string(),
        emailAddress: z.string(),
    }),
    captureAuthProviderCredentials: z.unknown(),
    createStripeCustomer: z.object({
        customerId: z.string(),
    }),
    createUserBillingProviderIdEntity: z.object({
        userBillingProviderEntityId: z.number(),
    }),
    createStripeCheckoutSession: z.object({
        stripeCheckoutSessionUrl: z.string(),
        stripeCheckoutSessionId: z.string(),
    }),
});

export type RegisterProviderTransaction = TransactionV1.TransactionDefinition<
    Context,
    typeof transactionDefinition.shape
>;
