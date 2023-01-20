import Stripe from 'stripe';
import { StripeWebhookParams } from '../webhookParams';

export interface ConstructEventParams {
    rawBody: Buffer;
    signature: string;
    signingSecret: string;
}

export const constructEventFactory =
    ({ stripe }: StripeWebhookParams) =>
    (
        params: ConstructEventParams
    ): { type: Stripe.Event['type']; data: Stripe.Event.Data } => {
        const { data, type } = stripe.constructEvent(params);
        return { data, type };
    };
