import { firebaseAdminVendor } from '@/lib/shared/vendors/firebase-admin';
import { prisma } from '@/lib/prisma';
import { ProvidersServiceParams } from './params';
import { profilesFactory } from './profiles';
import { AccountsService } from '../../accounts/service/service';
import { GetDashboardProps } from './dashboard/get-dashboard-props';

const factoryParams: ProvidersServiceParams = {
    prisma,
    firebaseAdmin: firebaseAdminVendor,
};
export const ProvidersService = {
    profiles: profilesFactory(factoryParams),
    getDashboardProps: GetDashboardProps.factory({
        ...factoryParams,
        accountsService: AccountsService,
    }),
};

export type ProvidersService = typeof ProvidersService;
