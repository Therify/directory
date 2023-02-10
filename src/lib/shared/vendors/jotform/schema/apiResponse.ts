import * as z from 'zod';

const RESPONSE_SCHEMA = {
    responseCode: z.number(),
    message: z.string(),
    content: z.unknown(),
    'limit-left': z.number(),
};

export const schema = z.object(RESPONSE_SCHEMA);

export type APIResponse = z.infer<typeof schema>;

export const validate = (value: unknown): APIResponse => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is APIResponse => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};

export function responseContentsFactory<S extends z.ZodSchema>(
    contentSchema: S
) {
    const responseSchema = z.object({
        responseCode: z.number(),
        message: z.string(),
        content: contentSchema,
        'limit-left': z.number(),
    });
    type ResponseType = z.infer<typeof responseSchema>;
    const validate = (value: unknown): ResponseType =>
        responseSchema.parse(value);
    const isValid = (value: unknown): value is ResponseType => {
        try {
            validate(value);
            return true;
        } catch {
            /* istanbul ignore next */
            return false;
        }
    };
    return {
        schema: responseSchema,
        validate,
        isValid,
    };
}
