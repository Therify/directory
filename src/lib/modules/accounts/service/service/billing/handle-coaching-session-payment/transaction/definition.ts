import * as z from 'zod';
import { TransactionDefinition } from '@/lib/shared/utils/transaction/transaction.v1';
import { AccountsServiceParams as Context } from '../../../params';

export const handleCoachingSessionPaymentTransactionDefinition = z.object({
    getCoachEntity: z.object({ id: z.string(), givenName: z.string() }),
    getMemberEntity: z.object({ id: z.string(), givenName: z.string() }),
    createInvoiceEntity: z.object({ invoiceId: z.string() }),
    createSessionInvoiceEntity: z.object({ sessionInvoiceId: z.string() }),
    handleChannelMessage: z.object({ messageDelivered: z.boolean() }),
});

export type HandleCoachingSessionPaymentTransaction = TransactionDefinition<
    Context,
    typeof handleCoachingSessionPaymentTransactionDefinition.shape
>;
