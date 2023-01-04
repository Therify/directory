import * as z from 'zod';

export const schema = z.object({
    email: z.string().email().optional(),
    phone_number: z.string().optional(),
    user_metadata: z.record(z.unknown()).optional(),
    blocked: z.boolean().optional(),
    email_verified: z.boolean().optional(),
    phone_verified: z.boolean().optional(),
    app_metadata: z.record(z.unknown()).optional(),
    given_name: z.string().optional(),
    family_name: z.string().optional(),
    name: z.string().optional(),
    nickname: z.string().optional(),
    picture: z.string().optional(),
    user_id: z.string().optional(),
    connection: z.string(),
    password: z.string().min(8),
    verify_email: z.boolean().default(false),
    user_name: z.string().optional(),
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
