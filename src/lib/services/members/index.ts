import { prisma } from '@/lib/prisma';
import { firebaseAdminVendor } from '@/lib/vendors/firebase-admin';
import { MembersServiceParams } from './params';
import { selfAssessmentsFactory } from './self-assessments';
import { GetHomePageProps } from './get-home-page-props';
import { AccountsService } from '../accounts';
import { GetDirectoryPageProps } from './get-directory-page-props';
import { GetDirectoryProfilePageProps } from './get-directory-profile-props';
import { FavoriteProfile } from './favorite-profile';

const factoryParams: MembersServiceParams = {
    prisma,
    firebaseAdmin: firebaseAdminVendor,
};
export const membersService = {
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
    favoriteProfile: FavoriteProfile.factory(factoryParams),
};

export type MembersService = typeof membersService;
