import { z } from 'zod';
import { TransactionV1 } from '@/lib/shared/utils';
import { ProvidersServiceParams } from '../../../params';

export const transactionDefinition = z.object({
    validateSeatAvailability: z.unknown(),
    validateUniqueEmail: z.unknown(),
    getPractice: z.object({
        practiceId: z.string(),
    }),
    createInvitation: z.object({
        invitationId: z.string(),
    }),
});

export type CreatePracticeProviderInvitationTransaction =
    TransactionV1.TransactionDefinition<
        ProvidersServiceParams,
        typeof transactionDefinition.shape
    >;
