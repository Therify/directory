import { StripeWebhookParams } from '../webhookParams';
import { handleInvoicesFactory } from './invoices';
import { handleSubscriptionFactory } from './subscriptions';

export const eventHandlersFactory = (context: StripeWebhookParams) => ({
    invoices: handleInvoicesFactory(context),
    subscriptions: handleSubscriptionFactory(context),
});
