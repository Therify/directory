import * as z from 'zod';
import { SelfAssessmentForm } from '@/lib/shared/types/forms/self-assessment';

export const schema = z.object({
    userId: z.string(),
    selfAssessmentSubmission: SelfAssessmentForm.schema,
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
