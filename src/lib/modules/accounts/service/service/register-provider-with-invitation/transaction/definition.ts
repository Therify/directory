import { z } from 'zod';
import { TransactionV1 } from '@/lib/shared/utils';
import { AccountsServiceParams as Context } from '../../params';

export const transactionDefinition = z.object({
    getInvitation: z.object({
        practiceId: z.string(),
        profileId: z.string().nullable(),
    }),
    createAuth0User: z.object({
        auth0UserId: z.string(),
        emailAddress: z.string(),
    }),
    assignAuth0Roles: z.unknown(),
    createTherifyUserEntity: z.object({
        therifyUserId: z.string(),
    }),
    createPracticeProvider: z.object({
        planId: z.string(),
    }),
    claimProfile: z.object({
        profileClaimed: z.boolean(),
    }),
    acceptInvitation: z.object({
        invitationAccepted: z.boolean(),
    }),
});

export type RegisterProviderWithInitationTransaction =
    TransactionV1.TransactionDefinition<
        Context,
        typeof transactionDefinition.shape
    >;
