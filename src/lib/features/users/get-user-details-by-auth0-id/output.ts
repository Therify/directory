import { PlanSchema, UserSchema } from '@/lib/schema';

import * as z from 'zod';

export const schema = z.object({
    details: z
        .object({
            plan: z
                .object({
                    status: PlanSchema.shape.status,
                    endDate: PlanSchema.shape.endDate,
                    renews: PlanSchema.shape.renews,
                    seats: PlanSchema.shape.seats,
                })
                .nullable(),
            user: z.object({
                userId: UserSchema.shape.id,
                email: UserSchema.shape.emailAddress,
                avatarUrl: z.string().optional(),
                roles: UserSchema.shape.roles,
                accountId: UserSchema.shape.accountId,
            }),
            firebaseToken: z.string().optional(),
        })
        .nullable(),
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
