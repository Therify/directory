import * as z from 'zod';
import { AccountSchema } from '@/lib/shared/schema';

export const accountSchema = AccountSchema.pick({
    name: true,
}).extend({
    accountId: z.string().optional(),
    billingUserId: z.string(),
    coveredSessions: z.number().min(0),
});

export const schema = z
    .discriminatedUnion('planType', [
        accountSchema.extend({
            planType: z.literal('individual'),
            billingCycle: z.enum(['month', 'biannual', 'annual']),
            seatCount: z.literal(1),
            isDtcAccount: z.boolean().optional(),
        }),
        accountSchema.extend({
            planType: z.literal('team'),
            seatCount: z.number().min(2).max(50),
            billingCycle: z.enum(['biannual', 'annual']),
        }),
    ])
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
