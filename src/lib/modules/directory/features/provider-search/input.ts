import { Country, Region } from '@/lib/shared/types';
import { SelfAssessment } from '@/lib/shared/types/self-assessment';
import * as z from 'zod';

export const schema = z.object({
    state: z.enum(Region.ENTRIES),
    country: z.enum(Country.ENTRIES),
    memberId: z.string(),
    memberPreferences: z
        .object({
            insuranceProvider: z.string().optional(),
            issues: z.string().array().optional(),
            languages: z.string().array().optional(),
        })
        .optional(),
    insuranceProvider: z.string().optional(),
    gender: z.string().optional(),
    specialties: z.string().array().optional(),
    languages: z.string().array().optional(),
    selfAssessment: SelfAssessment.schema,
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
