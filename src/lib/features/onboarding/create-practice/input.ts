import * as z from 'zod';
import { PracticeSchema } from '@/lib/schema';

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
        seatCount: z.number().min(1),
        priceId: z.string(),
        auth0UserId: z.string(),
    })
    .refine((data) => data.seatCount < 1, {
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
