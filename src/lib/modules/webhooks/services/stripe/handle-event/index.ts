import Stripe from 'stripe';
import { UnknownStripeEventTypeError } from '../errors';
import { eventHandlersFactory } from '../event-handlers';
import { StripeWebhookParams } from '../webhookParams';

interface HandleEventParams {
    type: string;
    data: Stripe.Event.Data;
}
export const handleEventFactory =
    (context: StripeWebhookParams) =>
    ({ type, data: { object, previous_attributes } }: HandleEventParams) => {
        const eventHandlers = eventHandlersFactory(context);
        switch (type) {
            case 'invoice.payment_failed':
                return eventHandlers.invoices.paymentFailed(object);
            case 'invoice.paid':
                return eventHandlers.invoices.paid(object);
            case 'customer.subscription.updated':
                return eventHandlers.subscriptions.updated(
                    object,
                    previous_attributes
                );
            default:
                handleUnknownEvent(type);
        }
    };

const handleUnknownEvent = (type: string) => {
    console.log(`Unexpected event type: ${type}`);
    if (process.env.NODE_ENV !== 'development') {
        throw new UnknownStripeEventTypeError(type);
    }
};
