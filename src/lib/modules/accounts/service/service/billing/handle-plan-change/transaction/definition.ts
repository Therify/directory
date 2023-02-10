import * as z from 'zod';
import { TransactionDefinition } from '@/lib/shared/utils/transaction/transaction.v1';
import { AccountsServiceParams as Context } from '../../../params';

export const handlePlanChangeTransactionDefinition = z.object({
    validatePriceId: z.unknown(),
    getTherifyUserDetails: z.object({
        therifyUserId: z.string(),
    }),
    invalidatePreviousPlans: z.object({
        invalidatedPlanIds: z.array(z.string()),
    }),
    createNewPlanEntity: z.object({
        planId: z.string(),
    }),
    createStripeInvoiceEntity: z.object({
        invoiceId: z.string(),
    }),
});

export type HandlePlanChangeTransaction = TransactionDefinition<
    Context,
    typeof handlePlanChangeTransactionDefinition.shape
>;
