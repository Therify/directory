import { StripeInvoice, StripeUtils } from '@/lib/shared/vendors/stripe';
import { AccountsService } from '@/lib/modules/accounts/service';
import { isValidTherifyPriceId } from '@/lib/shared/types';
import { NodeEnvironment } from '@/lib/shared/types/nodeEnvironment';

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
    if (
        !isValidTherifyPriceId(
            newProduct.price.id,
            process.env.VERCEL_ENV as NodeEnvironment
        )
    ) {
        throw new Error(`Unexpected price id: ${newProduct.price.id}`);
    }
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
