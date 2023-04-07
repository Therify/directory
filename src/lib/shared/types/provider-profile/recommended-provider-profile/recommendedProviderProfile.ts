import * as z from 'zod';
import * as ProvderProfile from '../providerProfile';

export const schema = ProvderProfile.schema.extend({
    score: z.number().default(0),
});

export type RecommendedProviderProfile = z.infer<typeof schema>;

export const validate = (value: unknown): RecommendedProviderProfile => {
    return schema.parse(value);
};

export const isValid = (
    value: unknown
): value is RecommendedProviderProfile => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
