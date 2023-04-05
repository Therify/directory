import { StripeWebhookParams } from '../../webhookParams';
import { handleInvoicePaymentFailedFactory } from './payment-failed';
import { handleInvoicePaidFactory } from './paid';
import { handleInvoiceSentFactory } from './sent';
import { handleInvoiceFinalizedFactory } from './finalized';

export const handleInvoicesFactory = (context: StripeWebhookParams) => ({
    paid: handleInvoicePaidFactory(context),
    paymentFailed: handleInvoicePaymentFailedFactory(context),
    finalized: handleInvoiceFinalizedFactory(context),
    sent: handleInvoiceSentFactory(context),
});
