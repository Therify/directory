import { PlanSchema } from '@/lib/schema';
import { TransactionDefinition } from '@/lib/utils/transaction/transaction.v1';
import * as z from 'zod';
import { AccountsServiceParams as Context } from '../../../params';

export const renewPlanTransactionDefinition = z.object({
    findPlanEntity: z.object({
        planId: z.string(),
        status: PlanSchema.shape.status,
        renews: z.boolean(),
    }),
    renewPlanEntity: z.object({
        updated: z.boolean(),
    }),
});

export type RenewPlanTransaction = TransactionDefinition<
    Context,
    typeof renewPlanTransactionDefinition.shape
>;
