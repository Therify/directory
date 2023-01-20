import { Types } from '@/lib/vendors/stripe';
import { AccountsService } from '@/lib/services/accounts';

interface HandleSubscriptionChangeInput {
    invoice: Types.StripeInvoice;
    accounts: AccountsService;
    customerId: string;
}
export const handleSubscriptionChange = async ({
    invoice,
    accounts,
    customerId,
}: HandleSubscriptionChangeInput) => {
    // const [oldProduct, newProduct] = invoice.lineItems;
    // if (
    //     oldProduct.price?.therifyProductId === undefined ||
    //     newProduct.price?.therifyProductId === undefined ||
    //     invoice.subscriptionId === undefined
    // ) {
    //     throw new Error(
    //         `No therify ${
    //             invoice.subscriptionId === undefined
    //                 ? ' subscription'
    //                 : 'product'
    //         } id found in invoice line item`
    //     );
    // }
    // return await accounts.billing.subscriptions.handleSubscriptionChange({
    //     startDate: newProduct.periodStart,
    //     endDate: newProduct.periodEnd,
    //     billingCustomerId: customerId,
    //     billingSubscriptionId: invoice.subscriptionId,
    //     previousProductId: oldProduct.price?.therifyProductId,
    //     newProductId: newProduct.price?.therifyProductId,
    //     invoiceStatus: invoice.status,
    //     invoiceId: invoice.id,
    //     invoiceTotal: invoice.total,
    //     invoiceAmountDue: invoice.amountDue,
    //     invoiceAmountPaid: invoice.amountPaid,
    //     invoiceAmountRemaining: invoice.amountRemaining,
    //     invoicePdf: invoice.invoicePdf,
    // });
};
