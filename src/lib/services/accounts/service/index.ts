import { prisma } from '@/lib/prisma';
import { vendorAuth0 } from '@/lib/vendors/auth0';
import { vendorStripe } from '@/lib/vendors/stripe';

import { CreateUser } from './create-user';
import { RegisterProvider } from './register-provider';
import { AccountsServiceParams } from './params';
import { IsEmailUnique } from './is-email-unique';
import { SendEmailVerification } from './send-email-verification';
import { GetVerificationEmailStatus } from './get-verification-email-status';
import { GetPlanStatusByUserId } from './get-plan-status-by-user-id';
import { GetPracticeByUserId } from './get-practice-by-user-id';
import { HandlePracticeOnboarding } from './handle-practice-onboarding';
import { registerMember } from './register-member';
import { Billing } from './billing';

const factoryParams: AccountsServiceParams = {
    prisma,
    stripe: vendorStripe,
    auth0: vendorAuth0,
};
export const AccountsService = {
    createUser: CreateUser.factory(factoryParams),
    registerProvider: RegisterProvider.factory(factoryParams),
    isEmailUnique: IsEmailUnique.factory(factoryParams),
    sendEmailVerification: SendEmailVerification.factory(factoryParams),
    getVerificationEmailStatus:
        GetVerificationEmailStatus.factory(factoryParams),
    getPlanStatusByUserId: GetPlanStatusByUserId.factory(factoryParams),
    getPracticeByUserId: GetPracticeByUserId.factory(factoryParams),
    handlePracticeOnboarding: HandlePracticeOnboarding.factory(factoryParams),
    registerMember: registerMember,
    billing: Billing.factory(factoryParams),
};

export type AccountsService = typeof AccountsService;
