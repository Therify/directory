import * as z from 'zod';

export const SERVER_FLAGS = {
    DID_FLAGS_LOAD: 'did-flags-load',
    HAS_STRIPE_CONNECT_ACCESS: 'has-stripe-connect-access',
    USE_IFRAME_REIMBURSEMENT_REQUEST: 'use-iframe-reimbursement-request',
    CAN_ACCESS_CLIENT_DETAILS_PAGE: 'can-access-client-details-page',
    BANNER_CONTENT: 'banner-content',
    IS_DTC_REGISTRATION_OPEN: 'is-dtc-registration-open',
    IS_COACH_SCHEDULING_ENABLED: 'is-coach-scheduling-enabled',
    IS_V3_DIRECTORY_ENABLED: 'is-v3-directory-enabled',
} as const;

export const CLIENT_FLAGS = {
    DID_FLAGS_LOAD: 'didFlagsLoad',
    HAS_STRIPE_CONNECT_ACCESS: 'hasStripeConnectAccess',
    USE_IFRAME_REIMBURSEMENT_REQUEST: 'useIframeReimbursementRequest',
    CAN_ACCESS_CLIENT_DETAILS_PAGE: 'canAccessClientDetailsPage',
    BANNER_CONTENT: 'bannerContent',
    IS_DTC_REGISTRATION_OPEN: 'isDtcRegistrationOpen',
    IS_COACH_SCHEDULING_ENABLED: 'isCoachSchedulingEnabled',
    IS_V3_DIRECTORY_ENABLED: 'isV3DirectoryEnabled',
} as const;

export const clientFlagsSchema = z.object({
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
    [CLIENT_FLAGS.IS_COACH_SCHEDULING_ENABLED]: z.boolean(),
    [CLIENT_FLAGS.IS_V3_DIRECTORY_ENABLED]: z.boolean(),
});

export type Type = z.infer<typeof clientFlagsSchema>;
type ClientFeatureFlags = Type;

export const defaultClientFlags: ClientFeatureFlags = {
    // `didFlagsLoad` should always be true from LaunchDarkly,
    // so if we see false in the client, it means we're fully falling back to default flags
    [CLIENT_FLAGS.DID_FLAGS_LOAD]: false,
    [CLIENT_FLAGS.HAS_STRIPE_CONNECT_ACCESS]: false,
    [CLIENT_FLAGS.USE_IFRAME_REIMBURSEMENT_REQUEST]: false,
    [CLIENT_FLAGS.CAN_ACCESS_CLIENT_DETAILS_PAGE]: false,
    [CLIENT_FLAGS.BANNER_CONTENT]: {},
    [CLIENT_FLAGS.IS_DTC_REGISTRATION_OPEN]: false,
    [CLIENT_FLAGS.IS_COACH_SCHEDULING_ENABLED]: false,
    [CLIENT_FLAGS.IS_V3_DIRECTORY_ENABLED]: false,
};

export const isValidClientFlags = (flags: unknown): boolean => {
    const { success } = clientFlagsSchema.safeParse(flags);
    return success;
};

const isValidFlag = (key: string, value: unknown): boolean => {
    if (key in defaultClientFlags === false) return false;
    const { success } = clientFlagsSchema.safeParse({
        ...defaultClientFlags,
        [key]: value,
    });
    return success;
};

const buildSafeClientFeatureFlags = (flags: unknown): ClientFeatureFlags => {
    if (!flags || typeof flags !== 'object') return defaultClientFlags;

    return Object.entries(flags).reduce<ClientFeatureFlags>(
        (safeFlags, [key, value]) => {
            if (isValidFlag(key, value)) {
                return { ...safeFlags, [key]: value };
            }
            return safeFlags;
        },
        defaultClientFlags
    );
};

export const validate = (flags: unknown): ClientFeatureFlags => {
    try {
        return clientFlagsSchema.parse(flags);
    } catch (error) {
        return buildSafeClientFeatureFlags(flags);
    }
};
