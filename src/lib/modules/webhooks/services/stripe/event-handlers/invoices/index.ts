import { StripeWebhookParams } from '../../webhookParams';
import { handleInvoicePaymentFailedFactory } from './payment-failed';
import { handleInvoicePaidFactory } from './paid';
import { handleInvoiceSentFactory } from './sent';
import { handleInvoiceUpdatedFactory } from './updated';

export const handleInvoicesFactory = (context: StripeWebhookParams) => ({
    paid: handleInvoicePaidFactory(context),
    paymentFailed: handleInvoicePaymentFailedFactory(context),
    updated: handleInvoiceUpdatedFactory(context),
    sent: handleInvoiceSentFactory(context),
});
