import Stripe from 'stripe';
import { StripeVendorFactoryParams } from '../types';
import { Input } from './schema';

export interface DeleteProductFactoryParams extends StripeVendorFactoryParams {}

export function factory({ stripe }: DeleteProductFactoryParams) {
    /**
     * Delete a product
     * @see https://stripe.com/docs/api/products/delete
     */
    return async function deleteProduct({
        productId,
    }: Input): Promise<Stripe.DeletedProduct> {
        return await stripe.products.del(productId);
    };
}
