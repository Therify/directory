import { ChannelSchema, PlanSchema, UserSchema } from '@/lib/shared/schema';
import { Channel, Role } from '@prisma/client';
import * as z from 'zod';

export const schema = z.lazy(() =>
    UserSchema.pick({
        emailAddress: true,
        givenName: true,
        surname: true,
        createdAt: true,
        roles: true,
        accountId: true,
        chatAccessToken: true,
        stripeConnectAccountId: true,
    })
        .extend({
            userId: z.string(),
            avatarUrl: z.string().optional(),
            firebaseToken: z.string().optional(),
            createdAt: z.string(),
            memberChannels: ChannelSchema.array().optional().default([]),
            providerChannels: ChannelSchema.array().optional().default([]),
            plan: PlanSchema.pick({
                status: true,
                startDate: true,
                endDate: true,
                renews: true,
                seats: true,
                coveredSessions: true,
            })
                .extend({
                    startDate: z.string(),
                    endDate: z.string(),
                })
                .nullable(),
            isPracticeAdmin: z.boolean(),
            isAccountAdmin: z.boolean().default(false),
        })
        .transform((user) => {
            return {
                ...user,
                hasChatEnabled: hasChatEnabled(user),
            };
        })
);
const PROVIDER_ROLES: readonly Role[] = [
    'provider_coach',
    'provider_therapist',
] as const;

function hasChatEnabled(user: {
    roles: Role[];
    chatAccessToken?: string | null;
    providerChannels?: Channel[];
    memberChannels?: Channel[];
}) {
    if (!user.chatAccessToken) return false;
    // handle provider roles
    if (PROVIDER_ROLES.some((role) => user.roles.includes(role)))
        return Boolean(user.providerChannels?.length ?? 0 > 0);
    // handle member roles
    return Boolean(user.memberChannels?.length ?? 0 > 0);
}

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
