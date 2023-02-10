import * as z from 'zod';
import { ANSWER_TYPES } from '../types';

export const schema = z.object({
    name: z.string().optional(),
    text: z.string().optional(),
    type: z.enum(ANSWER_TYPES).optional(),
    answer: z
        .union([
            z.string(),
            z.array(z.string()),
            z.record(z.string(), z.string()),
        ])
        .optional(),
});

export type Answer = z.infer<typeof schema>;

export const validate = (value: unknown): Answer => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Answer => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
