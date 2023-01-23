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
    ({ type, data: { object } }: HandleEventParams) => {
        const eventHandlers = eventHandlersFactory(context);
        switch (type) {
            case 'invoice.payment_failed':
                return eventHandlers.invoices.paymentFailed(object);
            case 'invoice.paid':
                return eventHandlers.invoices.paid(object);
            default:
                // Unexpected event type
                console.log(`Unexpected event type: ${type}`);
                throw new UnknownStripeEventTypeError(type);
        }
    };
