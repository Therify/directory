import { Types } from '@/lib/vendors/stripe';
import { AccountsService } from '@/lib/services/accounts';

interface HandleGroupPracticePaymentInput {
    invoice: Types.StripeInvoice;
    accounts: AccountsService;
    customerId: string;
    startDate: string;
    endDate: string;
    productId: string;
}
export const handleGroupPracticePayment = async ({
    invoice,
    accounts,
    customerId,
    startDate,
    endDate,
    productId,
}: HandleGroupPracticePaymentInput) => {
    if (!invoice.id) {
        throw new Error('No subscription id found on invoice');
    }
    // return await accounts.billing.subscriptions.handleSubscriptionPayment({
    //     startDate,
    //     endDate,
    //     billingCustomerId: customerId,
    //     billingSubscriptionId: invoice.id,
    //     productId,
    //     invoiceStatus: invoice.status,
    //     invoiceId: invoice.id,
    //     invoiceTotal: invoice.total,
    //     invoiceAmountDue: invoice.amountDue,
    //     invoiceAmountPaid: invoice.amountPaid,
    //     invoiceAmountRemaining: invoice.amountRemaining,
    //     invoicePdf: invoice.invoicePdf,
    // });
};
