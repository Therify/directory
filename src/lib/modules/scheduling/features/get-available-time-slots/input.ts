import * as z from 'zod';

export const schema = z.object({
    userId: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    timeOfDay: z.enum(['morning', 'afternoon', 'evening']).optional(),
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
