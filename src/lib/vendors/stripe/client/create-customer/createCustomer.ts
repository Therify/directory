import { StripeVendorFactoryParams } from '../types';
import { Input } from './schema';

export interface CreateCustomerFactoryParams
    extends StripeVendorFactoryParams {}

export const factory = ({ stripe }: CreateCustomerFactoryParams) => {
    return async function createCustomer(input: Input) {
        const customer = await stripe.customers.create(input);
        return customer;
    };
};
