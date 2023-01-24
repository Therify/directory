import * as z from 'zod';
import { PlanSchema, UserSchema } from '@/lib/schema';

export const schema = z.object({
    isLoading: z.boolean(),
    isRefetching: z.boolean(),
    errorMessage: z.string().optional(),
    user: z
        .object({
            userId: UserSchema.shape.id,
            email: UserSchema.shape.emailAddress,
            avatarUrl: z.string().optional(),
            roles: UserSchema.shape.roles,
            accountId: UserSchema.shape.accountId,
            plan: z
                .object({
                    status: PlanSchema.shape.status,
                    endDate: PlanSchema.shape.endDate,
                    renews: PlanSchema.shape.renews,
                    seats: PlanSchema.shape.seats,
                })
                .nullable(),
        })
        .optional(),
});
export type Output = z.infer<typeof schema>;
