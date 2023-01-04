import { ManagementClient } from 'auth0';
import { withAuth0VendorConfiguration } from './configuration';

export let auth0: ManagementClient;

export const getInstance = () => {
    if (!auth0) {
        auth0 = withAuth0VendorConfiguration((CONFIG) => {
            console.info('Creating new Auth0 Management Client');
            return new ManagementClient({
                domain: CONFIG.AUTH0_DOMAIN,
                clientId: CONFIG.AUTH0_CLIENT_ID,
                clientSecret: CONFIG.AUTH0_CLIENT_SECRET,
                tokenProvider: {
                    enableCache: true,
                },
            });
        });
    }
    return auth0;
};
