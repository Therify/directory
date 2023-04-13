import * as z from 'zod';
import { TransactionDefinition } from '@/lib/shared/utils/transaction/transaction.v1';
import { AccountsServiceParams as Context } from '../../../params';

export const handleMembershipPlanPaymentTransactionDefinition = z.object({
    getAccount: z.object({
        accountId: z.string(),
        accountOwnerId: z.string(),
    }),
    createPlanEntity: z.object({
        planId: z.string(),
    }),
    createInvoiceEntity: z.object({
        invoiceId: z.string(),
    }),
});

export type HandleMembershipPlanPaymentTransaction = TransactionDefinition<
    Context,
    typeof handleMembershipPlanPaymentTransactionDefinition.shape
>;
