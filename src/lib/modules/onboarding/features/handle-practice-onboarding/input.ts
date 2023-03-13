import * as z from 'zod';
import { PracticeSchema } from '@/lib/shared/schema';

export const schema = PracticeSchema.pick({
    name: true,
    address: true,
    address2: true,
    city: true,
    state: true,
    zip: true,
    phone: true,
    email: true,
    website: true,
})
    .extend({
        practiceId: z.string().optional(),
        seatCount: z.number().min(1),
        billingCycle: z.enum(['month', 'year']),
        userId: z.string(),
    })
    .refine((data) => data.seatCount > 0, {
        message: 'Must have at least one seat.',
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
