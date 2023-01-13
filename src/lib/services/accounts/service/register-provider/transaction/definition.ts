import { z } from 'zod';
import { TransactionV1 } from '@/lib/utils';
import { AccountsServiceParams as Context } from '../../params';
import { RegisterProvider } from '@/lib/features/registration';

export const transactionDefinition = z.object({
    createAuth0User: z.object({
        auth0UserId: z.string(),
        emailAddress: z.string(),
    }),
    createTherifyUserEntity: z.object({
        therifyUserId: z.string(),
    }),
    createStripeCustomer: z.object({
        customerId: z.string(),
    }),
    updateUserEntity: z.unknown(),
});

export type RegisterProviderTransaction = TransactionV1.TransactionDefinition<
    Context,
    typeof transactionDefinition.shape
>;
