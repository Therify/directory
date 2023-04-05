import Stripe from 'stripe';

interface ArchivePriceFactoryParams {
    stripe: Stripe;
}

export function factory({ stripe }: ArchivePriceFactoryParams) {
    return async function archivePrice(priceId: string): Promise<Stripe.Price> {
        const price = await stripe.prices.update(priceId, {
            active: false,
        });
        return price;
    };
}
