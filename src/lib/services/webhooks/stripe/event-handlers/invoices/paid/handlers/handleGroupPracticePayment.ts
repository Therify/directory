import { StripeInvoice } from '@/lib/vendors/stripe';
import { AccountsService } from '@/lib/services/accounts';

interface HandleGroupPracticePaymentInput {
    invoice: StripeInvoice.Type;
    accounts: AccountsService;
    customerId: string;
    subscriptionId: string;
    startDate: string;
    endDate: string;
    priceId: string;
    seats: number;
}
export const handleGroupPracticePayment = async ({
    invoice,
    accounts,
    customerId,
    subscriptionId,
    startDate,
    endDate,
    priceId,
    seats,
}: HandleGroupPracticePaymentInput) => {
    console.log('handleGroupPracticePayment...');
    return await accounts.billing.handleGroupPracticePlanPayment({
        startDate,
        endDate,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        priceId,
        invoiceStatus: invoice.status,
        invoiceId: invoice.id,
        invoiceTotal: invoice.total,
        invoiceAmountDue: invoice.amount_due,
        invoiceAmountPaid: invoice.amount_paid,
        invoiceAmountRemaining: invoice.amount_remaining,
        invoicePdf: invoice.invoicePdf,
        seats,
    });
};
