import { StripeWebhookParams } from '../../webhookParams';
import { handleInvoicePaymentFailedFactory } from './payment-failed';
import { handleInvoicePaidFactory } from './paid';

export const handleInvoicesFactory = (context: StripeWebhookParams) => ({
    paid: handleInvoicePaidFactory(context),
    paymentFailed: handleInvoicePaymentFailedFactory(context),
});
