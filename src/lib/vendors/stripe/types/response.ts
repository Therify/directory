import Stripe from 'stripe';
import * as z from 'zod';

export const schema: z.ZodType<Stripe.Response<unknown>> = z.object({
    data: z.unknown().optional(),
    has_more: z.boolean().optional(),
    object: z.string().optional(),
    url: z.string().optional(),
    lastResponse: z.object({
        headers: z.object({}),
        responseId: z.string(),
        requestId: z.string(),
        request: z.object({
            requestId: z.string(),
            idempotencyKey: z.string().optional(),
            method: z.string(),
            path: z.string(),
            query: z.object({}),
            headers: z.object({}),
            body: z.string().optional(),
        }),
        statusCode: z.number(),
        body: z.string(),
    }),
});

export type TypeName = z.infer<typeof schema>;

export const validate = (value: unknown): TypeName => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is TypeName => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
