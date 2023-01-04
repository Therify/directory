import * as z from 'zod';

export const schema = z.object({
    user_id: z.string().optional(),
    email: z.string().email().optional(),
    email_verified: z.boolean().optional(),
    phone_number: z.string().optional(),
    phone_verified: z.boolean().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    identities: z
        .array(
            z.object({
                connection: z.string(),
                user_id: z.string(),
                provider: z.string(),
                isSocial: z.boolean(),
            })
        )
        .optional(),
    app_metadata: z.record(z.unknown()).optional(),
    user_metadata: z.record(z.unknown()).optional(),
    picture: z.string().optional(),
    name: z.string().optional(),
    nickname: z.string().optional(),
    multifactor: z.array(z.string()).optional(),
    last_ip: z.string().optional(),
    last_login: z.string().optional(),
    logins_count: z.number().optional(),
    blocked: z.boolean().optional(),
    given_name: z.string().optional(),
    family_name: z.string().optional(),
});

export type Output = z.infer<typeof schema>;

export const validate = (value: unknown): Output => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Output => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
