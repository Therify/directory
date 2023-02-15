import { prisma } from '@/lib/prisma';
import { firebaseAdminVendor } from '@/lib/shared/vendors/firebase-admin';
import { MembersServiceParams } from './params';
import { selfAssessmentsFactory } from './self-assessments';
import { GetHomePageProps } from './get-home-page-props';
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
    getHomePageProps: GetHomePageProps.factory(factoryParams),
    getDirectoryPageProps: GetDirectoryPageProps.factory(factoryParams),
    getDirectoryProfilePageProps:
        GetDirectoryProfilePageProps.factory(factoryParams),
    getFavoritesPageProps: GetFavoritesPageProps.factory(factoryParams),
    favoriteProfile: FavoriteProfile.factory(factoryParams),
};

export type MembersService = typeof membersService;
