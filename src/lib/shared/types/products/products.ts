import { NodeEnvironment } from '../nodeEnvironment';
import { ProductConfigs, PRODUCTS, Product } from './types';
/**
 * This file contains the Product and Price IDs for the different products in the application.
 */

export const DEVELOPMENT_PRODUCT_IDS: ProductConfigs = {
    [PRODUCTS.MEMBER_INDIVIDUAL_PLAN]: {
        PRODUCT_ID: 'prod_NhBU0ErNIM7hxM',
        PRICES: {
            MONTHLY: 'price_1Mvn7yAllox7wzg5hYYwBeiS',
            BIANNUAL: 'price_1Mvn7yAllox7wzg5qzqQOOSe',
            ANNUAL: 'price_1Mvn7yAllox7wzg54f6KW7xe',
        },
    },
    [PRODUCTS.MEMBER_TEAM_PLAN]: {
        PRODUCT_ID: 'prod_NhBlhlLQ2HoRpZ',
        PRICES: {
            BIANNUAL: 'price_1MvnNUAllox7wzg5xmrPbAkE',
            ANNUAL: 'price_1MvnNUAllox7wzg531XrNelo',
        },
    },
    [PRODUCTS.COVERED_COACHING_SESSION]: {
        PRODUCT_ID: 'prod_NhBf9IzFhAuIQh',
        PRICES: {
            MONTHLY: 'price_1MxELYAllox7wzg55jxta3O2',
            BIANNUAL: 'price_1MxEM5Allox7wzg5FNV0KEy9',
            ANNUAL: 'price_1MxEMTAllox7wzg5lg1h3SbT',
        },
    },
} as const;

export const PRODUCTION_PRODUCT_IDS: ProductConfigs = {
    [PRODUCTS.MEMBER_INDIVIDUAL_PLAN]: {
        PRODUCT_ID: 'prod_NjAFvw1FPIG4sh',
        PRICES: {
            MONTHLY: 'price_1Mxhv4Allox7wzg5Dq9Cpmd9',
            BIANNUAL: 'price_1Mxhv4Allox7wzg5tVff5Hez',
            ANNUAL: 'price_1Mxhv4Allox7wzg5OMA8MNf3',
        },
    },
    [PRODUCTS.MEMBER_TEAM_PLAN]: {
        PRODUCT_ID: 'prod_NjAGcVI56YT54G',
        PRICES: {
            BIANNUAL: 'price_1MxhwJAllox7wzg5hII05Gxs',
            ANNUAL: 'price_1MxhwJAllox7wzg5dVh0vMt5',
        },
    },
    [PRODUCTS.COVERED_COACHING_SESSION]: {
        PRODUCT_ID: 'prod_NjAJgTK6CnTc59',
        PRICES: {
            MONTHLY: 'price_1MxhybAllox7wzg5ayezzR95',
            BIANNUAL: 'price_1MxhybAllox7wzg5AtDCpwWY',
            ANNUAL: 'price_1MxhybAllox7wzg5ryFWLORm',
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
    if (environment !== 'production')
        return PRODUCTS_BY_ENVIRONMENT['development'];
    return PRODUCTS_BY_ENVIRONMENT['production'];
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
        ...Object.values(products[PRODUCTS.MEMBER_TEAM_PLAN].PRICES),
        ...Object.values(products[PRODUCTS.MEMBER_INDIVIDUAL_PLAN].PRICES),
    ];
    return prices.includes(id);
}
