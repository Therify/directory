import { firebaseAdminVendor } from '@/lib/shared/vendors/firebase-admin';
import { prisma } from '@/lib/prisma';
import { ProvidersServiceParams } from './params';
import { profilesFactory } from './profiles';
import { pagePropsFactory } from './page-props';
import { GetDashboardProps } from './dashboard/get-dashboard-props';
import { invitationsFactory } from './invitations';
import { GetProviderTherifyUser } from './get-provider-therify-user';

const factoryParams: ProvidersServiceParams = {
    prisma,
    firebaseAdmin: firebaseAdminVendor,
};
export const ProvidersService = {
    profiles: profilesFactory(factoryParams),
    invitations: invitationsFactory(factoryParams),
    pageProps: pagePropsFactory(factoryParams),
    getTherifyUser: GetProviderTherifyUser.factory(factoryParams),
    getDashboardProps: GetDashboardProps.factory(factoryParams),
};

export type ProvidersService = typeof ProvidersService;
