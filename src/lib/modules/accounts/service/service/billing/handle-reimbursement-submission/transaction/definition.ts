import * as z from 'zod';
import { TransactionDefinition } from '@/lib/shared/utils/transaction/transaction.v1';
import { AccountsServiceParams as Context } from '../../../params';

export const handleReimbursementSubmissionDefinition = z.object({
    getMemberDetails: z.object({
        memberId: z.string(),
        planId: z.string(),
        dateOfSession: z.date(),
    }),
    getProviderDetails: z.object({
        providerProfileId: z.string(),
    }),
    claimSession: z.object({
        coveredSessionId: z.string(),
    }),
});

export type HandleReimbursementSubmissionTransaction = TransactionDefinition<
    Context,
    typeof handleReimbursementSubmissionDefinition.shape
>;
