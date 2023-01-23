import Stripe from 'stripe';

export const isSupportedBillingReason = (
    reason: Stripe.Invoice.BillingReason | null
) => {
    if (reason === null) {
        return false;
    }
    return [
        'manual', // one-off invoices
        'subscription',
        'subscription_cycle',
        'subscription_create',
        'subscription_update',
    ].includes(reason);
};
