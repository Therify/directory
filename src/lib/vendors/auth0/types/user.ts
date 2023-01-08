import * as z from 'zod';

export const schema = z.object({
    user_id: z.string().optional(),
    email: z.string().email().optional(),
    email_verified: z.boolean().optional(),
    username: z.string().optional(),
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
    app_metadata: z
        .object({
            authorization: z.object({
                roles: z.array(z.string()),
            }),
        })
        .optional(),
    user_metadata: z
        .object({
            name: z.string().optional(),
            surname: z.string().optional(),
            avatar: z.string().optional(),
        })
        .optional(),
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

export type User = z.infer<typeof schema>;

export const validate = (value: unknown): User => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is User => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
