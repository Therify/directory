import { createUser, createUserErrors } from './client/create-user';
import { deleteUser } from './client/delete-user';
import { getEmailStatus } from './client/get-email-status';
import { getUser } from './client/get-user';
import { sendEmailVerification } from './client/send-email-verification';
import { assignUserRoles } from './client/assign-user-roles';
export * from './types';
export * from './configuration';

export const vendorAuth0 = {
    createUser,
    deleteUser,
    getUser,
    sendEmailVerification,
    getEmailStatus,
    assignUserRoles,
} as const;

export type VendorAuth0 = typeof vendorAuth0;

export const Errors = {
    createUser: createUserErrors,
} as const;
