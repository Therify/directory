import * as trpc from '@trpc/server';
import {
    RegisterProvider,
    RegisterProviderWithInvitation,
    SendEmailVerification,
    GetVerificationEmailStatus,
    RegisterMember,
} from '@/lib/modules/registration/features';
import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';
import {
    GetUserDetailsById,
    GetPracticeByOwnerId,
} from '@/lib/modules/users/features';
import {
    registerProviderResolver,
    registerProviderWithInvitationResolver,
    registerMemberResolver,
    sendEmailVerificationResolver,
    getVerificationEmailStatusResolver,
    getUserDetailsByIdResolver,
    handlePracticeOnboardingResolver,
    getPracticeByOwnerIdResolver,
    handleStripeConnectOnboardingResolver,
} from './resolvers';
import { Context } from '../../../server/context';
import { HandleStripeConnectOnboarding } from '../features/billing';

export const router = trpc
    .router<Context>()
    .query(GetVerificationEmailStatus.TRPC_ROUTE, {
        input: GetVerificationEmailStatus.inputSchema,
        output: GetVerificationEmailStatus.outputSchema,
        resolve: getVerificationEmailStatusResolver,
    })
    .query(GetUserDetailsById.TRPC_ROUTE, {
        input: GetUserDetailsById.inputSchema,
        output: GetUserDetailsById.outputSchema,
        resolve: getUserDetailsByIdResolver,
    })
    .query(GetPracticeByOwnerId.TRPC_ROUTE, {
        input: GetPracticeByOwnerId.inputSchema,
        output: GetPracticeByOwnerId.outputSchema,
        resolve: getPracticeByOwnerIdResolver,
    })
    .mutation(HandlePracticeOnboarding.TRPC_ROUTE, {
        input: HandlePracticeOnboarding.inputSchema,
        output: HandlePracticeOnboarding.outputSchema,
        resolve: handlePracticeOnboardingResolver,
    })
    .mutation(HandleStripeConnectOnboarding.TRPC_ROUTE, {
        input: HandleStripeConnectOnboarding.inputSchema,
        output: HandleStripeConnectOnboarding.outputSchema,
        resolve: handleStripeConnectOnboardingResolver,
    })
    .mutation(RegisterProvider.TRPC_ROUTE, {
        input: RegisterProvider.inputSchema,
        output: RegisterProvider.outputSchema,
        resolve: registerProviderResolver,
    })
    .mutation(RegisterProviderWithInvitation.TRPC_ROUTE, {
        input: RegisterProviderWithInvitation.inputSchema,
        output: RegisterProviderWithInvitation.outputSchema,
        resolve: registerProviderWithInvitationResolver,
    })
    .mutation(RegisterMember.TRPC_ROUTE, {
        input: RegisterMember.inputSchema,
        output: RegisterMember.outputSchema,
        resolve: registerMemberResolver,
    })
    .mutation(SendEmailVerification.TRPC_ROUTE, {
        input: SendEmailVerification.inputSchema,
        output: SendEmailVerification.outputSchema,
        resolve: sendEmailVerificationResolver,
    });
