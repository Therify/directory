import Stripe from 'stripe';
import { StripeVendorFactoryParams } from '../types';
import { Input } from './schema';

interface SearchProductFactoryParams extends StripeVendorFactoryParams {}

export function factory({ stripe }: SearchProductFactoryParams) {
    /**
     * Search for products
     * @see https://stripe.com/docs/api/products/search
     */
    return async function searchProduct(input: Input): Promise<Stripe.Product> {
        const result = await stripe.products.search(input);
        const {
            data: [product],
        } = result;
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    };
}
