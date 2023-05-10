export const PRODUCTS = {
    MEMBER_TEAM_PLAN: 'member_team_plan',
    MEMBER_INDIVIDUAL_PLAN: 'member_individual_plan',
    COVERED_COACHING_SESSION: 'covered_coaching_session',
} as const;

export type Product = (typeof PRODUCTS)[keyof typeof PRODUCTS];

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
    [PRODUCTS.MEMBER_TEAM_PLAN]: GroupMemberProduct;
    [PRODUCTS.MEMBER_INDIVIDUAL_PLAN]: IndividuaMemberProduct;
    [PRODUCTS.COVERED_COACHING_SESSION]: CoveredCoachingSession;
};
