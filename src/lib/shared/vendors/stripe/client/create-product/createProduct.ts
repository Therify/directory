import Stripe from 'stripe';
import { Input } from './schema';

interface CreateProductFactoryParams {
    stripe: Stripe;
}

export function factory({ stripe }: CreateProductFactoryParams) {
    /**
     * Create a product
     * @see https://stripe.com/docs/api/products/create
     */
    return async function createProduct(input: Input): Promise<Stripe.Product> {
        const product = await stripe.products.create(input);
        return product;
    };
}
