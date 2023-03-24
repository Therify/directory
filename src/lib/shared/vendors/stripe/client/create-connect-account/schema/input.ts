import * as z from 'zod';

export const schema = z.object({
    email: z.string().email(),
    givenName: z.string(),
    surname: z.string(),
    dateOfBirth: z.string(),
    therifyUserId: z.string(),
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
