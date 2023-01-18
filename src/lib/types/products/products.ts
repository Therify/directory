import { NodeEnvironment } from '../nodeEnvironment';
/**
 * This file contains the Product and Price IDs for the different products in the application.
 */

export const PRODUCTS = {
    GROUP_PRACTICE_PLAN: 'group_practice_plan',
} as const;

export type Product = typeof PRODUCTS[keyof typeof PRODUCTS];

type ProductIds = {
    PRODUCT_ID: string;
    PRICES: {
        DEFAULT: string;
        [id: string]: string;
    };
};

export const DEVELOPMENT_PRODUCT_IDS: Record<Product, ProductIds> = {
    [PRODUCTS.GROUP_PRACTICE_PLAN]: {
        PRODUCT_ID: 'prod_N94KTDPkgySWMC',
        PRICES: {
            DEFAULT: 'price_1MOmC0Allox7wzg5rapKGwqU',
        },
    },
} as const;

export const PRODUCTION_PRODUCT_IDS: Record<Product, ProductIds> = {
    [PRODUCTS.GROUP_PRACTICE_PLAN]: {
        PRODUCT_ID: 'prod_N68tLSFmC9RrdQ',
        PRICES: {
            DEFAULT: 'price_1MLwbRAllox7wzg5WD9jewNh',
        },
    },
} as const;

export const PRODUCTS_BY_ENVIRONMENT: Record<
    'development' | 'production',
    Record<Product, ProductIds>
> = {
    development: DEVELOPMENT_PRODUCT_IDS,
    production: PRODUCTION_PRODUCT_IDS,
} as const;

/**
 * Get the product ID and price IDs for a given product and environment
 * @param product - The product to get the IDs for
 * @param environment - The environment to get the IDs for
 * @returns
 */
export function getProductByEnvironment(
    product: Product,
    environment: NodeEnvironment = 'development'
) {
    if (environment !== 'production')
        return PRODUCTS_BY_ENVIRONMENT['development'][product];
    return PRODUCTS_BY_ENVIRONMENT['production'][product];
}
