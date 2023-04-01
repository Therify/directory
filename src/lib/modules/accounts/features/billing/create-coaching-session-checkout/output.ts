import * as z from 'zod';
import { PlanSchema } from '@/lib/shared/schema';

export const schema = z.union([
    z.object({
        invoiceId: z.string(),
        errors: z.array(z.string()),
    }),
    z.object({
        invoiceId: z.literal(null),
        errors: z.array(z.string()),
    }),
]);
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
