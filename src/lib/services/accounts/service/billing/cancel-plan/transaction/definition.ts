import * as z from 'zod';
import { PlanSchema } from '@/lib/schema';
import { TransactionDefinition } from '@/lib/utils/transaction/transaction.v1';
import { AccountsServiceParams as Context } from '../../../params';

export const cancelPlanTransactionDefinition = z.object({
    findPlanEntity: z.object({
        planId: z.string(),
        status: PlanSchema.shape.status,
        renews: z.boolean(),
    }),
    cancelPlanEntity: z.object({
        updated: z.boolean(),
    }),
});

export type CancelPlanTransaction = TransactionDefinition<
    Context,
    typeof cancelPlanTransactionDefinition.shape
>;
