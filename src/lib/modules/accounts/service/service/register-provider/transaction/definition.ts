import { z } from 'zod';
import { TransactionV1 } from '@/lib/shared/utils';
import { AccountsServiceParams as Context } from '../../params';
import { RegisterProvider } from '@/lib/modules/registration/features';

export const transactionDefinition = z.object({
    createAuth0User: z.object({
        auth0UserId: z.string(),
        emailAddress: z.string(),
    }),
    assignAuth0Roles: z.unknown(),
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
