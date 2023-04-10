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
import { GetTherifyUserPageProps } from './get-therify-user-props';
import { GetChatPageProps } from './get-chat-page-props';
import { GetSelfAssessmentPageProps } from './get-self-assessment-page-props';
import { CreateSelfAssessment } from './create-self-assessment';
import { GetCarePageProps } from './get-care-page-props';
import { directoryService } from '../../directory/service';
import { GetBillingPageProps } from './get-billing-page-props';

const factoryParams: MembersServiceParams = {
    prisma,
    firebaseAdmin: firebaseAdminVendor,
};
export const membersService = {
    getTherifyUser: GetMemberTherifyUser.factory(factoryParams),
    getTherifyUserPageProps: GetTherifyUserPageProps.factory(factoryParams),
    getBillingPageProps: GetBillingPageProps.factory(factoryParams),
    selfAssessments: selfAssessmentsFactory(factoryParams),
    getHomePageProps: GetHomePageProps.factory(factoryParams),
    getDirectoryPageProps: GetDirectoryPageProps.factory(factoryParams),
    getDirectoryProfilePageProps:
        GetDirectoryProfilePageProps.factory(factoryParams),
    getFavoritesPageProps: GetFavoritesPageProps.factory(factoryParams),
    favoriteProfile: FavoriteProfile.factory(factoryParams),
    getChatPageProps: GetChatPageProps.factory(factoryParams),
    getSelfAssessmentPageProps:
        GetSelfAssessmentPageProps.factory(factoryParams),
    getCarePageProps: GetCarePageProps.factory({
        ...factoryParams,
        directoryService,
    }),
    createSelfAssessment: CreateSelfAssessment.factory(factoryParams),
};

export type MembersService = typeof membersService;
