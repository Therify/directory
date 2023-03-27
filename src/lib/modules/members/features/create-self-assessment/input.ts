import { SelfAssessment } from '@/lib/shared/types/self-assessment';
import * as z from 'zod';

export const schema = z.object({
    userId: z.string(),
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
