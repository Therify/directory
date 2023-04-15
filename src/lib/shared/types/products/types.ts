export const PRODUCTS = {
    GROUP_PRACTICE_PLAN: 'group_practice_plan',
    GROUP_MEMBER_PLAN: 'group_member_plan',
    INDIVIDUAL_MEMBER_PLAN: 'individual_member_plan',
    COVERED_COACHING_SESSION: 'covered_coaching_session',
} as const;

export type Product = (typeof PRODUCTS)[keyof typeof PRODUCTS];

export interface GroupPracticeProduct {
    PRODUCT_ID: string;
    PRICES: {
        MONTHLY: string;
        ANNUAL: string;
    };
}

export interface GroupMemberProduct {
    PRODUCT_ID: string;
    PRICES: {
        BIANNUAL: string;
        ANNUAL: string;
    };
}

export interface IndividuaMemberProduct {
    PRODUCT_ID: string;
    PRICES: { MONTHLY: string; BIANNUAL: string; ANNUAL: string };
}

export interface CoveredCoachingSession {
    PRODUCT_ID: string;
    PRICES: { MONTHLY: string; BIANNUAL: string; ANNUAL: string };
}

export type ProductConfigs = {
    [PRODUCTS.GROUP_PRACTICE_PLAN]: GroupPracticeProduct;
    [PRODUCTS.GROUP_MEMBER_PLAN]: GroupMemberProduct;
    [PRODUCTS.INDIVIDUAL_MEMBER_PLAN]: IndividuaMemberProduct;
    [PRODUCTS.COVERED_COACHING_SESSION]: CoveredCoachingSession;
};
