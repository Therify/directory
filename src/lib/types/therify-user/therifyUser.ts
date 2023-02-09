import { PlanSchema, UserSchema } from '@/lib/schema';
import * as z from 'zod';

export const schema = z.lazy(() =>
    UserSchema.pick({
        emailAddress: true,
        givenName: true,
        surname: true,
        createdAt: true,
        roles: true,
        accountId: true,
    }).extend({
        userId: z.string(),
        avatarUrl: z.string().optional(),
        firebaseToken: z.string().optional(),
        plan: PlanSchema.pick({
            status: true,
            startDate: true,
            endDate: true,
            renews: true,
            seats: true,
        }).nullable(),
        isPracticeAdmin: z.boolean(),
    })
);

export type TherifyUser = z.infer<typeof schema>;

export const validate = (value: unknown): TherifyUser => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is TherifyUser => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
