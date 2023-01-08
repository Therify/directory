import * as z from 'zod';

export const schema = z.object({
    access_token: z.string(),
    expires_in: z.number(),
    token_type: z.enum(['Bearer']),
    scope: z.string(),
});

export type AccessToken = z.infer<typeof schema>;

export const validate = (value: unknown): AccessToken => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is AccessToken => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
