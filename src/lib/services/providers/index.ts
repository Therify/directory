import { firebaseAdminVendor } from '@/lib/vendors/firebase-admin';
import { prisma } from '@/lib/prisma';
import { ProvidersServiceParams } from './params';
import { profilesFactory } from './profiles';

const factoryParams: ProvidersServiceParams = {
    prisma,
    firebaseAdmin: firebaseAdminVendor,
};
export const ProvidersService = {
    profiles: profilesFactory(factoryParams),
};

export type ProvidersService = typeof ProvidersService;
