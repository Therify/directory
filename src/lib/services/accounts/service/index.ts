import { prisma } from '@/lib/prisma';
import { vendorAuth0 } from '@/lib/vendors/auth0';
import { vendorStripe } from '@/lib/vendors/stripe';

import { CreateUser } from './create-user';
import { RegisterProvider } from './register-provider';
import { AccountsServiceParams } from './params';

const factoryParams: AccountsServiceParams = {
    prisma,
    stripe: vendorStripe,
    auth0: vendorAuth0,
};
export const AccountsService = {
    createUser: CreateUser.factory(factoryParams),
    registerProvider: RegisterProvider.factory(factoryParams),
};

export type AccountsService = typeof AccountsService;
