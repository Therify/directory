import * as z from 'zod';
import { PracticeSchema } from '@/lib/shared/schema';
import { UNITED_STATES, CANADA } from '@/lib/shared/types';

export const practiceSchema = PracticeSchema.pick({
    name: true,
    address: true,
    address2: true,
    city: true,
    state: true,
    zip: true,
    country: true,
    phone: true,
    email: true,
    website: true,
}).extend({
    practiceId: z.string().optional(),
    userId: z.string(),
});

export const schema = z.discriminatedUnion('country', [
    practiceSchema.extend({
        state: z.enum(CANADA.PROVINCE.ENTRIES),
        country: z.literal(CANADA.COUNTRY.CODE),
    }),
    practiceSchema.extend({
        state: z.enum(UNITED_STATES.STATE.ENTRIES),
        country: z.literal(UNITED_STATES.COUNTRY.CODE),
    }),
]);

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
