import { StripeWebhookParams } from '../../webhookParams';
import { handleSubscriptionUpdatedFactory } from './updated';

export const handleSubscriptionFactory = (context: StripeWebhookParams) => ({
    updated: handleSubscriptionUpdatedFactory(context),
});
