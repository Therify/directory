import * as z from 'zod';

export const schema = z.object({
    email: z.string().email().optional(),
    email_verified: z.boolean().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    phone_number: z.string().optional(),
    phone_verified: z.boolean().optional(),
    user_metadata: z.record(z.any()).optional(),
    app_metadata: z.record(z.any()).optional(),
    connection: z.string(),
    verify_email: z.boolean().optional(),
    verify_phone_number: z.boolean().optional(),
    name: z.string().optional(),
    picture: z.string().optional(),
    nickname: z.string().optional(),
    given_name: z.string().optional(),
    family_name: z.string().optional(),
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
