import { StripeInvoice, StripeUtils } from '@/lib/vendors/stripe';
import { AccountsService } from '@/lib/services/accounts';

interface HandlePlanChangeInput {
    invoice: StripeInvoice.Type;
    accounts: AccountsService;
    customerId: string;
    subscriptionId: string;
}
export const handlePlanChange = async ({
    invoice,
    accounts,
    customerId: stripeCustomerId,
    subscriptionId: stripeSubscriptionId,
}: HandlePlanChangeInput) => {
    console.log('handleSubscriptionChange...');
    const [oldProduct, newProduct] = invoice.lines.data;
    return await accounts.billing.handlePlanChange({
        startDate: StripeUtils.getDateFromStripeTimestamp(
            newProduct.period.start
        ).toISOString(),
        endDate: StripeUtils.getDateFromStripeTimestamp(
            newProduct.period.end
        ).toISOString(),
        stripeSubscriptionId,
        stripeCustomerId,
        invoiceId: invoice.id,
        invoiceTotal: invoice.total,
        invoiceAmountDue: invoice.amount_due,
        invoiceAmountPaid: invoice.amount_paid,
        invoiceAmountRemaining: invoice.amount_remaining,
        invoicePdf: invoice.invoicePdf,
        invoiceStatus: invoice.status,
        newStripePriceId: newProduct.price.id,
        previousStripePriceId: oldProduct.price.id,
        previousSeatCount: oldProduct.quantity,
        newSeatCount: newProduct.quantity,
    });
};
