import * as z from 'zod';

export const schema = z.object({
    accessToken: z.string(),
    calendarId: z.string(),
    startsAfter: z.string().optional(),
    endsBefore: z.string().optional(),
    limit: z.number().optional(),
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
