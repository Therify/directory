import Stripe from 'stripe';
import * as z from 'zod';
import { stripeAddressSchema } from '../../../types';

export const shippingSchema: z.ZodType<Stripe.CustomerCreateParams.Shipping> =
    z.object({
        address: stripeAddressSchema,
        name: z.string(),
        phone: z.string(),
    });

export const schema: z.ZodType<Stripe.CustomerCreateParams> = z.object({
    address: stripeAddressSchema.optional(),
    description: z.string().optional(),
    email: z.string().optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
    payment_method: z.string().optional(),
    shipping: shippingSchema.optional(),
    metadata: z
        .record(z.string(), z.union([z.string(), z.number()]))
        .optional(),
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
