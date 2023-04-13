import * as z from 'zod';
import { TransactionDefinition } from '@/lib/shared/utils/transaction/transaction.v1';
import { AccountsServiceParams as Context } from '../../../params';
import { SessionInvoiceSchema, StripeInvoiceSchema } from '@/lib/shared/schema';

export const handleCoachingSessionPaymentTransactionDefinition = z.object({
    getCoachEntity: z.object({ id: z.string(), givenName: z.string() }),
    getMemberEntity: z.object({ id: z.string(), givenName: z.string() }),
    handleInvoiceEntity: z.object({
        invoiceId: z.string(),
        previousValues: z
            .object({
                status: StripeInvoiceSchema.shape.status,
                total: StripeInvoiceSchema.shape.total,
                amountDue: StripeInvoiceSchema.shape.amountDue,
                amountPaid: StripeInvoiceSchema.shape.amountPaid,
                amountRemaining: StripeInvoiceSchema.shape.amountRemaining,
                invoicePdf: StripeInvoiceSchema.shape.invoicePdf,
            })
            .nullable(),
    }),
    handleSessionInvoiceEntity: z.object({
        sessionInvoiceId: z.string(),
        previousValues: z
            .object({
                status: SessionInvoiceSchema.shape.status,
            })
            .nullable(),
    }),
    handleChannelMessage: z.object({ messageDelivered: z.boolean() }),
});

export type HandleCoachingSessionPaymentTransaction = TransactionDefinition<
    Context,
    typeof handleCoachingSessionPaymentTransactionDefinition.shape
>;
