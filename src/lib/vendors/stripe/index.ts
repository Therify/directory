import Stripe from 'stripe';
import { CreateCustomer } from './client/create-customer';
import { CreateProduct } from './client/create-product';
import { DeleteCustomer } from './client/delete-customer';
import { DeleteProduct } from './client/delete-product';
import { RetrieveCustomer } from './client/retrieve-customer';
import { SearchProduct } from './client/search-product';
import { withStripeConfiguration } from './configuration';

export const VendorStripe = withStripeConfiguration((CONFIG) => {
    const stripe = new Stripe(CONFIG.STRIPE_SECRET_KEY, {
        apiVersion: '2022-11-15',
    });
    return {
        createCustomer: CreateCustomer.factory({
            stripe,
        }),
        retrieveCustomer: RetrieveCustomer.factory({
            stripe,
        }),
        deleteCustomer: DeleteCustomer.factory({
            stripe,
        }),
        createProduct: CreateProduct.factory({
            stripe,
        }),
        searchProduct: SearchProduct.factory({
            stripe,
        }),
        deleteProduct: DeleteProduct.factory({
            stripe,
        }),
    };
});

export type VendorStripe = typeof VendorStripe;
