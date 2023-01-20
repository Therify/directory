import * as z from 'zod';

export const schema = z.object({
    id: z.string(),
    auto_advance: z.boolean(),
    charge: z.string(),
    collection_method: z.enum(['charge_automatically', 'send_invoice']),
    currency: z.string(),
    customer: z.string(),
    description: z.string(),
    hosted_invoice_url: z.string(),
    // TODO: Figure out
});

export type Invoice = z.infer<typeof schema>;

export const validate = (value: unknown): Invoice => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Invoice => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
