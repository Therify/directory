import Stripe from 'stripe';
import { Input } from './schema';

export interface RetrieveCustomerFactoryParams {
    stripe: Stripe;
}

export function factory({ stripe }: RetrieveCustomerFactoryParams) {
    return async function retrieveCustomer({ customerId }: Input) {
        const customer = await stripe.customers.retrieve(customerId);
        return customer;
    };
}
