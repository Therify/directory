import * as z from 'zod';
import { TransactionDefinition } from '@/lib/utils/transaction/transaction.v1';
import { AccountsServiceParams as Context } from '../../../params';

export const handlePlanChangeTransactionDefinition = z.object({
    validatePriceId: z.unknown(),
    getPlanDetails: z.object({
        therifyUserId: z.string(),
        planId: z.string(),
        seatCount: z.number(),
    }),
    updatePlanEntity: z.object({
        newSeatCount: z.number(),
    }),
    createStripeInvoiceEntity: z.object({
        invoiceId: z.string(),
    }),
});

export type HandlePlanChangeTransaction = TransactionDefinition<
    Context,
    typeof handlePlanChangeTransactionDefinition.shape
>;
