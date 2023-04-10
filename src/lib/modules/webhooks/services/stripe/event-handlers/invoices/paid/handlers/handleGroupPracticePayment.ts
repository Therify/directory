import { StripeInvoice } from '@/lib/shared/vendors/stripe';
import { AccountsService } from '@/lib/modules/accounts/service';
import { isValidTherifyPriceId } from '@/lib/shared/types';
import { NodeEnvironment } from '@/lib/shared/types/nodeEnvironment';

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
    if (
        !isValidTherifyPriceId(
            priceId,
            process.env.VERCEL_ENV as NodeEnvironment
        )
    ) {
        throw new Error(`Unexpected price id: ${priceId}`);
    }
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
