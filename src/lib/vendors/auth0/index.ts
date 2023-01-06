import { getUser } from './get-user';
import { createUser } from './create-user';
import { deleteUser } from './delete-user';

export const vendorAuth0 = {
    createUser,
    deleteUser,
    getUser,
};

export type VendorAuth0 = typeof vendorAuth0;
