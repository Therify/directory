import * as z from 'zod';

export const schema = z.object({
    id: z.string(),
    object: z.literal('card'),
    address_city: z.string(),
    address_country: z.string(),
    address_line1: z.string(),
    address_line1_check: z.string(),
    address_line2: z.string(),
    address_state: z.string(),
    address_zip: z.string(),
    address_zip_check: z.string(),
    brand: z.string(),
    country: z.string(),
    customer: z.string(),
    cvc_check: z.string(),
    dynamic_last4: z.string(),
    exp_month: z.number(),
    exp_year: z.number(),
    fingerprint: z.string(),
    funding: z.string(),
    last4: z.string(),
    metadata: z.object({}),
    name: z.string(),
    tokenization_method: z.string(),
});

export type Card = z.infer<typeof schema>;

export const validate = (value: unknown): Card => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Card => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
