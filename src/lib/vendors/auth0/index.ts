import { withAuth0VendorConfiguration } from './configuration';
import { CreateUser } from './create-user';
import { DeleteUser } from './delete-user';
import { GetUser } from './get-user';
import { getInstance } from './singleton';
export * from './configuration';

export const vendorAuth0 = withAuth0VendorConfiguration((CONFIG) => {
    const auth0 = getInstance();
    return {
        createUser: CreateUser.factory({
            auth0,
            connection: CONFIG.AUTH0_CONNECTION,
        }),
        deleteUser: DeleteUser.factory({
            auth0,
        }),
        getUser: GetUser.factory({
            auth0,
        }),
    };
});

export type VendorAuth0 = typeof vendorAuth0;
