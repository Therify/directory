import { ProviderProfileSchema } from '@/lib/schema';
import * as z from 'zod';

export const schema = z.object({
    profile: ProviderProfileSchema.nullable(),
    errors: z.array(z.string()),
});

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
