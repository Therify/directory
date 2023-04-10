import * as z from 'zod';

const productSchema = z.union([
    z.object({
        productId: z.string(),
    }),
    z.object({
        name: z.string(),
        active: z.boolean().optional().default(true),
        metadata: z.record(z.string()).optional(),
    }),
]);

export const schema = z.object({
    currency: z.enum(['USD']),
    unitAmountInCents: z.number(),
    active: z.boolean().optional().default(true),
    metadata: z.record(z.string()).optional(),
    productData: productSchema,
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
