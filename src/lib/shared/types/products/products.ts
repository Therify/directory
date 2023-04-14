import { NodeEnvironment } from '../nodeEnvironment';
import { ProductConfigs, PRODUCTS, Product } from './types';
/**
 * This file contains the Product and Price IDs for the different products in the application.
 */

export const DEVELOPMENT_PRODUCT_IDS: ProductConfigs = {
    [PRODUCTS.GROUP_PRACTICE_PLAN]: {
        PRODUCT_ID: 'prod_N94KTDPkgySWMC',
        PRICES: {
            MONTHLY: 'price_1MOmC0Allox7wzg5rapKGwqU',
            ANNUAL: 'price_1MlGl1Allox7wzg5qhovHhDp',
        },
    },
    [PRODUCTS.INDIVIDUAL_MEMBER_PLAN]: {
        PRODUCT_ID: 'prod_NhBU0ErNIM7hxM',
        PRICES: {
            MONTHLY: 'price_1Mvn7yAllox7wzg5hYYwBeiS',
            BIANNUAL: 'price_1Mvn7yAllox7wzg5qzqQOOSe',
            ANNUAL: 'price_1Mvn7yAllox7wzg54f6KW7xe',
        },
    },
    [PRODUCTS.GROUP_MEMBER_PLAN]: {
        PRODUCT_ID: 'prod_NhBlhlLQ2HoRpZ',
        PRICES: {
            BIANNUAL: 'price_1MvnNUAllox7wzg5xmrPbAkE',
            ANNUAL: 'price_1MvnNUAllox7wzg531XrNelo',
        },
    },
    [PRODUCTS.COVERED_COACHING_SESSION]: {
        PRODUCT_ID: 'prod_NhBf9IzFhAuIQh',
        PRICES: {
            DEFAULT: 'price_1MvnHiAllox7wzg53a4bZGu6',
        },
    },
} as const;

export const PRODUCTION_PRODUCT_IDS: ProductConfigs = {
    [PRODUCTS.GROUP_PRACTICE_PLAN]: {
        PRODUCT_ID: 'prod_N68tLSFmC9RrdQ',
        PRICES: {
            MONTHLY: 'price_1MbwAQAllox7wzg5jmrDiIdA',
            ANNUAL: 'price_1MlHjSAllox7wzg5HKWnEHKS',
        },
    },
    [PRODUCTS.INDIVIDUAL_MEMBER_PLAN]: {
        // TODO: Update these with the production product IDs
        PRODUCT_ID: '',
        PRICES: {
            MONTHLY: '',
            BIANNUAL: '',
            ANNUAL: '',
        },
    },
    [PRODUCTS.GROUP_MEMBER_PLAN]: {
        PRODUCT_ID: '',
        PRICES: {
            BIANNUAL: '',
            ANNUAL: '',
        },
    },
    [PRODUCTS.COVERED_COACHING_SESSION]: {
        PRODUCT_ID: '',
        PRICES: {
            DEFAULT: '',
        },
    },
} as const;

export const PRODUCTS_BY_ENVIRONMENT: Record<
    'development' | 'production',
    ProductConfigs
> = {
    development: DEVELOPMENT_PRODUCT_IDS,
    production: PRODUCTION_PRODUCT_IDS,
} as const;

export const getProductsByEnvironment = (environment: NodeEnvironment) => {
    if (environment === 'production') {
        return PRODUCTS_BY_ENVIRONMENT['production'];
    }
    return PRODUCTS_BY_ENVIRONMENT['development'];
};

/**
 * Get the product ID and price IDs for a given product and environment
 * @param product - The product to get the IDs for
 * @param environment - The environment to get the IDs for
 * @returns ProductIds map
 */
export function getProductByEnvironment(
    product: Product,
    environment: NodeEnvironment = 'development'
): ProductConfigs[Product] {
    const products = getProductsByEnvironment(environment);
    return products[product];
}

/**
 * Determine if given price ID is recognized as a known price ID in a given environment
 * @param id - The price id to check
 * @param environment - The environment products to check against
 * @returns boolean
 */
export function isValidTherifyPriceId(
    id: string,
    environment: NodeEnvironment
) {
    const products = getProductsByEnvironment(environment);
    const prices = Object.values(products).flatMap(({ PRICES }) => {
        return Object.values(PRICES);
    });
    return prices.includes(id);
}

export function isValidMembershipPriceId(
    id: string,
    environment: NodeEnvironment
) {
    const products = getProductsByEnvironment(environment);
    const prices = [
        ...Object.values(products[PRODUCTS.GROUP_MEMBER_PLAN].PRICES),
        ...Object.values(products[PRODUCTS.INDIVIDUAL_MEMBER_PLAN].PRICES),
    ];
    return prices.includes(id);
}
