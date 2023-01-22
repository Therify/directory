import * as z from 'zod';
import { TransactionDefinition } from '@/lib/utils/transaction/transaction.v1';
import { AccountsServiceParams as Context } from '../../../params';

export const handleGroupPracticePlanPaymentTransactionDefinition = z.object({
    getTherifyIdentifiers: z.object({
        therifyUserId: z.string(),
    }),
    createPlanEntity: z.object({
        planId: z.string(),
    }),
    createInvoiceEntity: z.object({
        invoiceId: z.string(),
    }),
});

export type HandleGroupPracticePlanPaymentTransaction = TransactionDefinition<
    Context,
    typeof handleGroupPracticePlanPaymentTransactionDefinition.shape
>;
