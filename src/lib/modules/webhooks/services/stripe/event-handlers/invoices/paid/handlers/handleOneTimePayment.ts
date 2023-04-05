import { StripeInvoice } from '@/lib/shared/vendors/stripe';
import { AccountsService } from '@/lib/modules/accounts/service';

interface HandleGroupPracticePaymentInput {
    invoice: StripeInvoice.Type;
    accounts: AccountsService;
    customerId: string;
    priceId: string;
}
export const handleOneTimePayment = async ({
    invoice,
    accounts,
    customerId: stripeCustomerId,
    priceId,
}: HandleGroupPracticePaymentInput) => {
    return await accounts.billing.handleCoachingSessionPayment({
        stripeCustomerId,
        priceId,
        invoiceId: invoice.id,
        invoiceStatus: invoice.status,
        invoiceTotal: invoice.total,
        invoiceAmountDue: invoice.amount_due,
        invoiceAmountPaid: invoice.amount_paid,
        invoiceAmountRemaining: invoice.amount_remaining,
        invoicePdf: invoice.invoicePdf,
        invoiceNumber: invoice.number ?? undefined,
        hostedInvoiceUrl: invoice.hosted_invoice_url ?? undefined,
        dateOfSession: invoice.metadata.dateOfSession,
    });
};
