import * as z from 'zod';

export const schema = z.object({
    id: z.string(),
    object: z.literal('checkout.session'),
    livemode: z.boolean(),
    metadata: z.record(z.string()),
    mode: z.enum(['payment', 'setup', 'subscription']),
    status: z.enum(['open', 'complete', 'expired']),
    customer: z.string(),
    payment_intent: z.string().nullable(),
});

export type Type = z.infer<typeof schema>;

export const validate = (value: unknown): Type => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Type => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
