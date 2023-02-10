import * as z from 'zod';

export const schema = z.object({
    id: z.string().optional(),
    object: z.literal('product'),
    active: z.boolean().optional(),
    created: z.number().optional(),
    description: z.string().optional(),
    images: z.array(z.string()).optional(),
    livemode: z.boolean().optional(),
    metadata: z.record(z.string()).optional(),
    name: z.string().optional(),
    url: z.string().optional(),
});

export type Product = z.infer<typeof schema>;

export const validate = (value: unknown): Product => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Product => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
