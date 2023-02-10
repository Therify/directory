import Stripe from 'stripe';
import { StripeVendorFactoryParams } from '../types';
import { Input, Output } from './schema';

export interface CreateCheckoutSessionFactoryParams
    extends StripeVendorFactoryParams {}

export const factory =
    ({ stripe }: CreateCheckoutSessionFactoryParams) =>
    async ({ sessionId }: Input): Promise<Output> => {
        const { id } = await stripe.checkout.sessions.expire(sessionId);
        return { sessionId: id };
    };
