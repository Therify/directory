import { StripeInvoice, StripeUtils } from '@/lib/shared/vendors/stripe';
import { AccountsService } from '@/lib/modules/accounts/service';
import {
    getProductsByEnvironment,
    isValidMembershipPriceId,
    NodeEnvironment,
    PRODUCTS,
} from '@/lib/shared/types';
import { LineItem } from '@/lib/shared/vendors/stripe/types/lineItem';

const COVERED_COACHING_SESSION = getProductsByEnvironment(
    process.env.VERCEL_ENV as NodeEnvironment
)[PRODUCTS.COVERED_COACHING_SESSION];

interface HandlePaymentInput {
    invoice: StripeInvoice.Type;
    accounts: AccountsService;
    customerId: string;
    subscriptionId: string;
}
export const handleMembershipPayment = async ({
    invoice,
    accounts,
    customerId: stripeCustomerId,
    subscriptionId: stripeSubscriptionId,
}: HandlePaymentInput) => {
    const [item1, item2] = invoice.lines.data;

    const {
        plan,
        coveredSessions,
    }: {
        plan: LineItem;
        coveredSessions: LineItem | undefined;
    } = isValidMembershipPriceId(
        item1.price.id,
        process.env.VERCEL_ENV as NodeEnvironment
    )
        ? { plan: item1, coveredSessions: item2 }
        : { plan: item2, coveredSessions: item1 };
    const isPlanIdValid = isValidMembershipPriceId(
        plan.price.id,
        process.env.VERCEL_ENV as NodeEnvironment
    );
    const isSessionIdValid =
        coveredSessions === undefined ||
        Object.values(COVERED_COACHING_SESSION.PRICES).includes(
            coveredSessions.price.id
        );

    if (!isPlanIdValid) {
        throw new Error('Invalid membership price id');
    }
    if (!isSessionIdValid) {
        throw new Error('Invalid covered sessions price id');
    }
    const numberOfCoveredSessions =
        !!coveredSessions?.quantity && coveredSessions.quantity > 1
            ? Math.floor(coveredSessions.quantity / plan.quantity)
            : coveredSessions?.quantity ?? 0;
    if (isNaN(numberOfCoveredSessions)) {
        throw new Error('Unable to calculate number of covered sessions');
    }
    return await accounts.billing.handleMembershipPlanPayment({
        startDate: StripeUtils.getDateFromStripeTimestamp(
            plan.period.start
        ).toISOString(),
        endDate: StripeUtils.getDateFromStripeTimestamp(
            plan.period.end
        ).toISOString(),
        stripeCustomerId,
        stripeSubscriptionId,
        priceId: plan.price.id,
        invoiceStatus: invoice.status,
        invoiceId: invoice.id,
        invoiceTotal: invoice.total,
        invoiceAmountDue: invoice.amount_due,
        invoiceAmountPaid: invoice.amount_paid,
        invoiceAmountRemaining: invoice.amount_remaining,
        invoicePdf: invoice.invoicePdf,
        seats: plan.quantity,
        coveredSessions: numberOfCoveredSessions,
    });
};
