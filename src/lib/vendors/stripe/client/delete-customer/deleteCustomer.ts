import { StripeVendorFactoryParams } from '../types';
import { Input } from './schema';

export interface DeleteCustomerFactoryParams
    extends StripeVendorFactoryParams {}

export function factory({ stripe }: DeleteCustomerFactoryParams) {
    /**
     * Deletes a customer.
     * @param customerId - The ID of the customer to be deleted.
     * @returns A boolean indicating whether the customer was deleted.
     * @see https://stripe.com/docs/api/customers/delete
     */
    return async function deleteCustomer({
        customerId,
    }: Input): Promise<boolean> {
        const customer = await stripe.customers.del(customerId);
        return customer.deleted;
    };
}
