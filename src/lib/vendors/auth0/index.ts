import { ManagementClient } from 'auth0';
import { withAuth0VendorConfiguration } from './configuration';
import { CreateUser } from './create-user';
export * from './configuration';

export const vendorAuth0 = withAuth0VendorConfiguration((CONFIG) => {
    const auth0 = new ManagementClient({
        domain: CONFIG.AUTH0_DOMAIN,
        clientId: CONFIG.AUTH0_CLIENT_ID,
        clientSecret: CONFIG.AUTH0_CLIENT_SECRET,
    });
    return {
        createUser: CreateUser.factory({
            auth0,
            connection: CONFIG.AUTH0_CONNECTION,
        }),
    };
});

export type VendorAuth0 = typeof vendorAuth0;
