import * as z from 'zod';
import { PlanSchema } from '@/lib/shared/schema';

export const schema = z.object({
    subscription: z
        .object({
            status: PlanSchema.shape.status,
            startDate: z.string(),
            endDate: z.string(),
        })
        .optional(),
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
