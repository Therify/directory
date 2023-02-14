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
import { GetPracticeByUserId } from './get-practice-by-user-id';
import { HandlePracticeOnboarding } from './handle-practice-onboarding';
import { registerMember } from './register-member';
import { Billing } from './billing';
import { GetUserDetailsById } from './get-user-details-by-id';
import { CreateFirebaseAuthToken } from './create-firebase-auth-token';
import { GetAccountByRegistrationCode } from './get-account-by-registration-code';
import { RegisterProviderWithInvitation } from './register-provider-with-invitation';

const factoryParams: AccountsServiceParams = {
    prisma,
    stripe: vendorStripe,
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
    getPracticeByUserId: GetPracticeByUserId.factory(factoryParams),
    handlePracticeOnboarding: HandlePracticeOnboarding.factory(factoryParams),
    registerMember: registerMember,
    createFirebaseAuthToken: CreateFirebaseAuthToken.factory(factoryParams),
    getAccountByRegistrationCode:
        GetAccountByRegistrationCode.factory(factoryParams),
    billing: Billing.factory(factoryParams),
};

export type AccountsService = typeof AccountsService;
