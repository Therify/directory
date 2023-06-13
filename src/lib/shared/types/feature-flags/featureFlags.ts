import * as z from 'zod';

export const SERVER_FLAGS = {
    DID_FLAGS_LOAD: 'did-flags-load',
    HAS_STRIPE_CONNECT_ACCESS: 'has-stripe-connect-access',
    USE_IFRAME_REIMBURSEMENT_REQUEST: 'use-iframe-reimbursement-request',
    CAN_ACCESS_CLIENT_DETAILS_PAGE: 'can-access-client-details-page',
    BANNER_CONTENT: 'banner-content',
    IS_DTC_REGISTRATION_OPEN: 'is-dtc-registration-open',
} as const;

export const CLIENT_FLAGS = {
    DID_FLAGS_LOAD: 'didFlagsLoad',
    HAS_STRIPE_CONNECT_ACCESS: 'hasStripeConnectAccess',
    USE_IFRAME_REIMBURSEMENT_REQUEST: 'useIframeReimbursementRequest',
    CAN_ACCESS_CLIENT_DETAILS_PAGE: 'canAccessClientDetailsPage',
    BANNER_CONTENT: 'bannerContent',
    IS_DTC_REGISTRATION_OPEN: 'isDtcRegistrationOpen',
} as const;

export const schema = z.object({
    [CLIENT_FLAGS.DID_FLAGS_LOAD]: z.boolean(),
    [CLIENT_FLAGS.HAS_STRIPE_CONNECT_ACCESS]: z.boolean(),
    [CLIENT_FLAGS.USE_IFRAME_REIMBURSEMENT_REQUEST]: z.boolean(),
    [CLIENT_FLAGS.CAN_ACCESS_CLIENT_DETAILS_PAGE]: z.boolean(),
    [CLIENT_FLAGS.BANNER_CONTENT]: z.object({
        message: z.string().optional(),
        color: z.string().optional(),
        linkUrl: z.string().optional(),
        linkText: z.string().optional(),
    }),
    [CLIENT_FLAGS.IS_DTC_REGISTRATION_OPEN]: z.boolean(),
});

export type Type = z.infer<typeof schema>;
type FeatureFlags = Type;

export const defaultFlags: FeatureFlags = {
    // `didFlagsLoad` should always be true from LaunchDarkly,
    // so if we see false in the client, it means we're fully falling back to default flags
    [CLIENT_FLAGS.DID_FLAGS_LOAD]: false,
    [CLIENT_FLAGS.HAS_STRIPE_CONNECT_ACCESS]: false,
    [CLIENT_FLAGS.USE_IFRAME_REIMBURSEMENT_REQUEST]: false,
    [CLIENT_FLAGS.CAN_ACCESS_CLIENT_DETAILS_PAGE]: false,
    [CLIENT_FLAGS.BANNER_CONTENT]: {},
    [CLIENT_FLAGS.IS_DTC_REGISTRATION_OPEN]: false,
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
