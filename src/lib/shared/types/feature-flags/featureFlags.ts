import * as z from 'zod';

export const schema = z.object({
    didFlagsLoad: z.boolean(),
    hasStripeConnectAccess: z.boolean(),
    useIframeReimbursementRequest: z.boolean(),
    canAccessClientDetailsPage: z.boolean(),
    bannerContent: z.object({
        message: z.string().optional(),
        color: z.string().optional(),
        linkUrl: z.string().optional(),
        linkText: z.string().optional(),
    }),
});

export type Type = z.infer<typeof schema>;
type FeatureFlags = Type;

export const defaultFlags: FeatureFlags = {
    // `didFlagsLoad` should always be true from the server,
    // so if we see false in the client, it means we're fully falling back to default flags
    didFlagsLoad: false,
    hasStripeConnectAccess: false,
    useIframeReimbursementRequest: false,
    canAccessClientDetailsPage: false,
    bannerContent: {},
};

export const isValid = (flags: unknown): boolean => {
    const { success } = schema.safeParse(flags);
    return success;
};

const isValidFlag = (key: string, value: unknown): boolean => {
    if (key in defaultFlags === false) return false;
    const { success } = schema.safeParse({ ...defaultFlags, [key]: value });
    return success;
};

const buildSafeFeatureFlags = (flags: unknown): FeatureFlags => {
    if (!flags || typeof flags !== 'object') return defaultFlags;

    return Object.entries(flags).reduce<FeatureFlags>(
        (safeFlags, [key, value]) => {
            if (isValidFlag(key, value)) {
                return { ...safeFlags, [key]: value };
            }
            return safeFlags;
        },
        defaultFlags
    );
};

export const validate = (flags: unknown): FeatureFlags => {
    try {
        return schema.parse(flags);
    } catch (error) {
        return buildSafeFeatureFlags(flags);
    }
};
