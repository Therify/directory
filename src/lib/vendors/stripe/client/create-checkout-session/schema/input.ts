import Stripe from 'stripe';
import * as z from 'zod';
import { stripeAddressSchema } from '../../../types';

export const schema = z.object({
    priceId: z.string(),
    quantity: z.number().optional(),
    customerId: z.string(),
    successUrl: z.string(),
    cancelUrl: z.string(),
    checkoutMode: z.enum(['payment', 'setup', 'subscription']),
    submitMessage: z.string().optional(),
    allowPromotionCodes: z.boolean().optional().default(true),
});

export type Input = z.infer<typeof schema>;

export const validate = (value: unknown): Input => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Input => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
