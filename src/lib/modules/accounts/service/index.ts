import { prisma } from '@/lib/prisma';
import { vendorAuth0 } from '@/lib/shared/vendors/auth0';
import { vendorStripe } from '@/lib/shared/vendors/stripe';
import { firebaseAdminVendor } from '@/lib/shared/vendors/firebase-admin';

import { CreateUser } from './create-user';
import { RegisterProvider } from './register-provider';
import { AccountsServiceParams } from './params';
import { IsEmailUnique } from './is-email-unique';
import { SendEmailVerification } from './send-email-verification';
import { GetVerificationEmailStatus } from './get-verification-email-status';
import { GetPracticeByOwnerId } from './get-practice-by-owner-id';
import { HandlePracticeOnboarding } from './handle-practice-onboarding';
import { registerMember } from './register-member';
import { registerDTCMember } from './register-dtc-member';
import { registerAccountOwner } from './register-account-owner';
import { Billing } from './billing';
import { GetUserDetailsById } from './get-user-details-by-id';
import { CreateFirebaseAuthToken } from './create-firebase-auth-token';
import { GetAccountByRegistrationCode } from './get-account-by-registration-code';
import { RegisterProviderWithInvitation } from './register-provider-with-invitation';
import { vendorStreamChat } from '@/lib/shared/vendors/stream-chat';
import { GetAccountByOwnerId } from './get-account-by-owner-id';
import { GetAccountOnboardingPageProps } from './get-account-onboarding-page-props';
import { HandleAccountOnboarding } from './handle-account-onboarding';
import { GetRegistrationCodeByAccountOwnerId } from './get-registration-code-by-account-owner-id';
import { GetAccountDetailsByOwnerId } from './get-account-details-by-owner-id';

const factoryParams: AccountsServiceParams = {
    prisma,
    stripe: vendorStripe,
    streamChat: vendorStreamChat,
    auth0: vendorAuth0,
    firebaseAdmin: firebaseAdminVendor,
};
export const AccountsService = {
    createUser: CreateUser.factory(factoryParams),
    registerProvider: RegisterProvider.factory(factoryParams),
    registerProviderWithInvitation:
        RegisterProviderWithInvitation.factory(factoryParams),
    isEmailUnique: IsEmailUnique.factory(factoryParams),
    sendEmailVerification: SendEmailVerification.factory(factoryParams),
    getVerificationEmailStatus:
        GetVerificationEmailStatus.factory(factoryParams),
    getUserDetailsById: GetUserDetailsById.factory(factoryParams),
    getPracticeByOwnerId: GetPracticeByOwnerId.factory(factoryParams),
    handlePracticeOnboarding: HandlePracticeOnboarding.factory(factoryParams),
    registerMember,
    registerDTCMember,
    registerAccountOwner,
    getAccountByOwnerId: GetAccountByOwnerId.factory(factoryParams),
    getRegistrationCodeByAccountOwnerId:
        GetRegistrationCodeByAccountOwnerId.factory(factoryParams),
    createFirebaseAuthToken: CreateFirebaseAuthToken.factory(factoryParams),
    getAccountByRegistrationCode:
        GetAccountByRegistrationCode.factory(factoryParams),
    billing: Billing.factory(factoryParams),
    getAccountOnboardingPageProps: GetAccountOnboardingPageProps.factory({}),
    handleAccountOnboarding: HandleAccountOnboarding.factory(factoryParams),
    getAccountDetailsByOwnerId:
        GetAccountDetailsByOwnerId.factory(factoryParams),
};

export type AccountsService = typeof AccountsService;
