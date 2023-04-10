import { createResultSchema } from '@/lib/shared/types/result';
import { SelfAssessment } from '@/lib/shared/types/self-assessment';
import * as z from 'zod';

export const schema = createResultSchema(SelfAssessment.schema);

export type Output = z.infer<typeof schema>;

export const validate = (value: unknown): Output => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Output => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
