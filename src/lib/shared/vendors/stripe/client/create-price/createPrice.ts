import Stripe from 'stripe';
import { Input } from './schema';

interface CreatePriceFactoryParams {
    stripe: Stripe;
}

export function factory({ stripe }: CreatePriceFactoryParams) {
    /**
     * Create a product
     * @see https://stripe.com/docs/api/products/create
     */
    return async function createPrice({
        currency = 'USD',
        unitAmountInCents,
        active = true,
        metadata,
        productData,
    }: Input): Promise<Stripe.Price> {
        const price = await stripe.prices.create({
            unit_amount: unitAmountInCents,
            currency,
            active,
            metadata,
            ...('productId' in productData
                ? {
                      product: productData.productId,
                  }
                : {
                      product_data: {
                          name: productData.name,
                          active: productData.active,
                          metadata: productData.metadata,
                      },
                  }),
        });
        return price;
    };
}
