import { createUser } from './client/create-user';
import { deleteUser } from './client/delete-user';
import { getUser } from './client/get-user';
export * from './types';
export * from './configuration';

export const VendorAuth0 = {
    createUser,
    deleteUser,
    getUser,
} as const;

export type VendorAuth0 = typeof VendorAuth0;
