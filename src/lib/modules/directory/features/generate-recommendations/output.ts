import { ProviderProfile } from '@/lib/shared/types';
import { createResultSchema } from '@/lib/shared/types/result';
import * as z from 'zod';

export const recommendationsSchema = z.object({
    idealMatches: ProviderProfile.schema.array().default([]),
    ethnicMatches: ProviderProfile.schema.array().default([]),
    genderMatches: ProviderProfile.schema.array().default([]),
    concernsMatches: ProviderProfile.schema.array().default([]),
});

export const schema = createResultSchema(recommendationsSchema);

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
