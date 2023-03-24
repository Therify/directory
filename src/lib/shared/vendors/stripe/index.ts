import Stripe from 'stripe';
import { CreateCheckoutSession } from './client/create-checkout-session';
import { CreateCustomer } from './client/create-customer';
import { CreateProduct } from './client/create-product';
import { DeleteCustomer } from './client/delete-customer';
import { DeleteProduct } from './client/delete-product';
import { ExpireCheckoutSession } from './client/expire-checkout-session';
import { RetrieveCustomer } from './client/retrieve-customer';
import { SearchProduct } from './client/search-product';
import { ConstructEvent } from './client/construct-event';
import { withStripeConfiguration } from './configuration';
import { CreateExpressAccount } from './client/create-express-account';
import { CreateAccountLink } from './client/create-account-link';
import { CreateStripeConnectLoginLink } from './client/create-stripe-connect-login-link';
import { DeleteExpressAccount } from './client/delete-express-account';

export * from './types';
export * as StripeUtils from './utils';

export const vendorStripe = withStripeConfiguration((CONFIG) => {
    const stripe = new Stripe(CONFIG.STRIPE_SECRET_KEY, {
        apiVersion: '2022-11-15',
    });
    return {
        createExpressAccount: CreateExpressAccount.factory({
            stripe,
        }),
        deleteExpressAccount: DeleteExpressAccount.factory({
            stripe,
        }),
        createAccountLink: CreateAccountLink.factory({
            stripe,
        }),
        createStripeConnectLoginLink: CreateStripeConnectLoginLink.factory({
            stripe,
        }),
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
        createCheckoutSession: CreateCheckoutSession.factory({
            stripe,
        }),
        expireCheckoutSession: ExpireCheckoutSession.factory({ stripe }),
        constructEvent: ConstructEvent.factory({
            stripe,
        }),
    };
});

export type VendorStripe = typeof vendorStripe;
