import * as z from 'zod';

export const schema = z.object({
    memberName: z.string(),
    providerName: z.string(),
    providerNotes: z.string().optional(),
});

export type DeclineRequestEmailProps = z.infer<typeof schema>;

export const validate = (value: unknown): DeclineRequestEmailProps => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is DeclineRequestEmailProps => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
