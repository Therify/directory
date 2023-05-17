import * as z from 'zod';

export const schema = z.object({
    submissionId: z.string(),
    memberEmail: z.string(),
    dateOfSession: z.date(),
    provider: z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        practiceName: z.string(),
    }),
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
