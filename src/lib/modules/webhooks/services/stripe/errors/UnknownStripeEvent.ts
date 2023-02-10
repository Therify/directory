export class UnknownStripeEventTypeError extends Error {
    constructor(eventType: string) {
        super(`Unknown Stripe event type: ${eventType}`);
    }
}
