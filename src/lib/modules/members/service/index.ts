import { prisma } from '@/lib/prisma';
import { firebaseAdminVendor } from '@/lib/shared/vendors/firebase-admin';
import { MembersServiceParams } from './params';
import { selfAssessmentsFactory } from './self-assessments';
import { GetHomePageProps } from './get-home-page-props';
import { AccountsService } from '../../accounts/service';
import { GetDirectoryPageProps } from './get-directory-page-props';
import { GetDirectoryProfilePageProps } from './get-directory-profile-props';
import { FavoriteProfile } from './favorite-profile';
import { GetFavoritesPageProps } from './get-favorites-page-props';
import { GetMemberTherifyUser } from './get-member-therify-user';

const factoryParams: MembersServiceParams = {
    prisma,
    firebaseAdmin: firebaseAdminVendor,
};
export const membersService = {
    getTherifyUser: GetMemberTherifyUser.factory(factoryParams),
    selfAssessments: selfAssessmentsFactory(factoryParams),
    getHomePageProps: GetHomePageProps.factory({
        ...factoryParams,
        accountService: AccountsService,
    }),
    getDirectoryPageProps: GetDirectoryPageProps.factory({
        ...factoryParams,
        accountService: AccountsService,
    }),
    getDirectoryProfilePageProps: GetDirectoryProfilePageProps.factory({
        ...factoryParams,
        accountService: AccountsService,
    }),
    getFavoritesPageProps: GetFavoritesPageProps.factory({
        ...factoryParams,
        accountsService: AccountsService,
    }),
    favoriteProfile: FavoriteProfile.factory(factoryParams),
};

export type MembersService = typeof membersService;
