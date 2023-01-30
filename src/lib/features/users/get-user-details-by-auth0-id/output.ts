import { PlanSchema, UserSchema } from '@/lib/schema';

import * as z from 'zod';

export const schema = z.object({
    user: z
        .object({
            userId: UserSchema.shape.id,
            auth0Id: UserSchema.shape.auth0Id,
            emailAddress: UserSchema.shape.emailAddress,
            avatarUrl: z.string().optional(),
            givenName: UserSchema.shape.givenName,
            surname: UserSchema.shape.surname,
            createdAt: UserSchema.shape.createdAt,
            roles: UserSchema.shape.roles,
            accountId: UserSchema.shape.accountId,
            plan: z
                .object({
                    status: PlanSchema.shape.status,
                    startDate: PlanSchema.shape.startDate,
                    endDate: PlanSchema.shape.endDate,
                    renews: PlanSchema.shape.renews,
                    seats: PlanSchema.shape.seats,
                })
                .nullable(),
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
