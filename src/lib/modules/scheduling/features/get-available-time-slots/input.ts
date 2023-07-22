import * as z from 'zod';

export const schema = z.object({
    userId: z.string(),
    emailAddress: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
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
