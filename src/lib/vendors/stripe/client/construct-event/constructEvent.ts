import Stripe from 'stripe';
import { StripeVendorFactoryParams } from '../types';

interface ConstructEventFactoryParams extends StripeVendorFactoryParams {}

interface ConstructEventFactory {
    (params: ConstructEventFactoryParams): {
        (args: {
            rawBody: string | Buffer;
            signature: string;
            signingSecret: string;
        }): Stripe.Event;
    };
}

export const factory: ConstructEventFactory = ({
    stripe,
}: ConstructEventFactoryParams) => {
    return ({ rawBody, signature, signingSecret }) => {
        return stripe.webhooks.constructEvent(
            rawBody,
            signature,
            signingSecret
        );
    };
};
