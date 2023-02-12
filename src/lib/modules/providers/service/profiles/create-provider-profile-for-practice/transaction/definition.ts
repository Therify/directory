import { z } from 'zod';
import { TransactionV1 } from '@/lib/shared/utils';
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
    createPracticeProfile: z.unknown(),
});

export type CreateProviderProfileForPracticeTransaction =
    TransactionV1.TransactionDefinition<
        ProvidersServiceParams,
        typeof transactionDefinition.shape
    >;
