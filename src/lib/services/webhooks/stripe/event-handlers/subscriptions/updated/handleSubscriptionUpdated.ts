import Stripe from 'stripe';
import { StripeSubsctiption } from '@/lib/vendors/stripe';
import { StripeWebhookParams } from '../../../webhookParams';

export const handleSubscriptionUpdatedFactory =
    ({ accounts }: StripeWebhookParams) =>
    async (
        rawSubscription: unknown,
        previousAttributes?: Stripe.Event.Data.PreviousAttributes
    ) => {
        const subscription = StripeSubsctiption.schema.parse(rawSubscription);
        const subscriptionId = subscription.id;

        if (!subscriptionId) {
            throw new Error('Subscription ID not found');
        }

        const isCanceling =
            subscription.cancel_at_period_end ||
            subscription.status === 'canceled';

        const isRenewing =
            (previousAttributes as { cancel_at_period_end: boolean })
                ?.cancel_at_period_end === true &&
            subscription.cancel_at_period_end === false;

        if (isCanceling || isRenewing) {
            const handlerFn = isCanceling
                ? accounts.billing.cancelPlan
                : accounts.billing.renewPlan;
            const result = await handlerFn({
                stripeSubscriptionId: subscriptionId,
            });

            if (result.isErr()) {
                let errorMessage = 'Could not handle plan update';
                result.mapErr(([errorStep, error]) => {
                    const message = (error as Error)?.message;
                    const failedStepMessage = `Failed on step: ${errorStep}`;
                    errorMessage = `[handleSubscriptionUpdated error]: ${
                        message ?? failedStepMessage
                    }`;
                });
                throw new Error(errorMessage);
            }
        }

        return {
            success: true,
        };
    };
