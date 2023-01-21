import { StripeInvoice } from '@/lib/vendors/stripe';
import { AccountsService } from '@/lib/services/accounts';

interface HandleGroupPracticePaymentInput {
    invoice: StripeInvoice.Type;
    accounts: AccountsService;
    customerId: string;
    startDate: string;
    endDate: string;
    priceId: string;
}
export const handleGroupPracticePayment = async ({
    invoice,
    accounts,
    customerId,
    startDate,
    endDate,
    priceId,
}: HandleGroupPracticePaymentInput) => {
    console.log('handleGroupPracticePayment...');
    if (!invoice.id) {
        throw new Error('No subscription id found on invoice');
    }
    // return await accounts.billing.subscriptions.handleSubscriptionPayment({
    //     startDate,
    //     endDate,
    //     billingCustomerId: customerId,
    //     billingSubscriptionId: invoice.id,
    //     priceId,
    //     invoiceStatus: invoice.status,
    //     invoiceId: invoice.id,
    //     invoiceTotal: invoice.total,
    //     invoiceAmountDue: invoice.amountDue,
    //     invoiceAmountPaid: invoice.amountPaid,
    //     invoiceAmountRemaining: invoice.amountRemaining,
    //     invoicePdf: invoice.invoicePdf,
    // });
};
