import { StripeWebhookParams } from '../webhookParams';
import { handleInvoicesFactory } from './invoices';

export const eventHandlersFactory = (context: StripeWebhookParams) => ({
    invoices: handleInvoicesFactory(context),
});
