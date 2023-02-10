import { z } from 'zod';
import { TransactionV1 } from '@/lib/utils';
import { ProvidersServiceParams } from '../../../params';

export const transactionDefinition = z.object({
    getPractice: z.object({
        practiceId: z.string(),
    }),
    createProviderProfile: z.object({
        profileId: z.string(),
    }),
    createDirectoryListing: z.object({
        listingPracticeId: z.string(),
        listingProfileId: z.string(),
    }),
    createPracticeProviderInvitation: z.object({
        invitationId: z.string().optional(),
    }),
});

export type CreateProviderProfileForPracticeTransaction =
    TransactionV1.TransactionDefinition<
        ProvidersServiceParams,
        typeof transactionDefinition.shape
    >;
