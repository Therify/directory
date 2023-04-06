import { SelfAssessmentSchema } from '@/lib/shared/schema';
import * as z from 'zod';
import { Issue } from '../issues';
import { processPreferences } from './process-preferences';

export const schema = SelfAssessmentSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
}).transform(({ preferences, concerns, ...rest }) => ({
    preferences: processPreferences(preferences),
    concerns: concerns.map(Issue.validate),
    ...rest,
}));

export const persistedSchema = SelfAssessmentSchema.transform(
    ({ preferences, concerns, ...rest }) => ({
        preferences: processPreferences(preferences),
        concerns: concerns.map(Issue.validate),
        ...rest,
    })
);
export type SelfAssessment = z.infer<typeof schema>;

export const validate = (value: unknown): SelfAssessment => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is SelfAssessment => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};

/**
 *
 * @param selfAssessment - Self assessment from the database
 * @returns
 */
export function fromPersisted(
    selfAssessment: z.infer<typeof SelfAssessmentSchema>
): SelfAssessment {
    return validate(selfAssessment);
}
