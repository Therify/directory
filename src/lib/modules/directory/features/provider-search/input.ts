import { UNITED_STATES } from '@/lib/shared/types';
import * as z from 'zod';

export const schema = z.object({
    state: z.enum(UNITED_STATES.STATE.ENTRIES),
    memberPreferences: z
        .object({
            insuranceProvider: z.string().optional(),
            state: z.string().optional(),
            issues: z.string().array().optional(),
            languages: z.string().array().optional(),
        })
        .optional(),
    insuranceProvider: z.string().optional(),
    gender: z.string().optional(),
    specialties: z.string().array().optional(),
    languages: z.string().array().optional(),
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
