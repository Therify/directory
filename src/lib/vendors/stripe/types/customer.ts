import * as z from 'zod';
import { schema as stripeAddress } from './address';
import { schema as stripeDiscount } from './discount';

export const schema = z.object({
    id: z.string(),
    object: z.literal('customer'),
    address: stripeAddress,
    balance: z.number(),
    created: z.number(),
    currency: z.string(),
    default_source: z.string(),
    delinquent: z.boolean(),
    description: z.string(),
    discount: stripeDiscount,
    email: z.string(),
    invoice_prefix: z.string(),
    invoice_settings: z.object({
        custom_fields: z.array(
            z.object({
                name: z.string(),
                value: z.string(),
            })
        ),
        default_payment_method: z.string(),
        footer: z.string(),
    }),
    livemode: z.boolean(),
    metadata: z.object({}),
    name: z.string(),
    next_invoice_sequence: z.number(),
    phone: z.string(),
    preferred_locales: z.array(z.string()),
    shipping: z.object({}),
    tax_exempt: z.string(),
});

export type Customer = z.infer<typeof schema>;

export const validate = (value: unknown): Customer => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Customer => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
