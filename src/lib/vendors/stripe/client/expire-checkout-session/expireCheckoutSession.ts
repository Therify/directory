import Stripe from 'stripe';
import { StripeVendorFactoryParams } from '../types';
import { Input } from './schema';
// import { processStripeError } from '../../errors';
// import { StripeIntent } from '../../intents';

export interface CreateCheckoutSessionFactoryParams
    extends StripeVendorFactoryParams {}

export const factory =
    ({ stripe }: CreateCheckoutSessionFactoryParams) =>
    async ({ sessionId }: Input): Promise<Stripe.Checkout.Session> => {
        // try {
        return await stripe.checkout.sessions.expire(sessionId);
        // } catch (error) {
        //     throw processStripeError(StripeIntent.CreateCheckoutSession, error);
        // }
    };
