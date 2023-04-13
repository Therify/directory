import * as trpc from '@trpc/server';
import {
    RegisterProvider,
    RegisterProviderWithInvitation,
    SendEmailVerification,
    GetVerificationEmailStatus,
    RegisterMember,
    RegisterAccountOwner,
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
    createStripeConnectLoginUrlResolver,
    createCoachingSessionInvoiceResolver,
    registerAccountOwnerResolver,
    getAccountByOwnerIdResolver,
} from './resolvers';
import { Context } from '../../../server/context';
import {
    HandleStripeConnectOnboarding,
    CreateStripeConnectLoginUrl,
    CreateCoachingSessionInvoice,
} from '../features/billing';
import { GetAccountByOwnerId } from '../features';

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
    .mutation(CreateStripeConnectLoginUrl.TRPC_ROUTE, {
        input: CreateStripeConnectLoginUrl.inputSchema,
        output: CreateStripeConnectLoginUrl.outputSchema,
        resolve: createStripeConnectLoginUrlResolver,
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
    .mutation(RegisterAccountOwner.TRPC_ROUTE, {
        input: RegisterAccountOwner.inputSchema,
        output: RegisterAccountOwner.outputSchema,
        resolve: registerAccountOwnerResolver,
    })
    .query(GetAccountByOwnerId.TRPC_ROUTE, {
        input: GetAccountByOwnerId.inputSchema,
        output: GetAccountByOwnerId.outputSchema,
        resolve: getAccountByOwnerIdResolver,
    })
    .mutation(RegisterMember.TRPC_ROUTE, {
        input: RegisterMember.inputSchema,
        output: RegisterMember.outputSchema,
        resolve: registerMemberResolver,
    })
    .mutation(CreateCoachingSessionInvoice.TRPC_ROUTE, {
        input: CreateCoachingSessionInvoice.inputSchema,
        output: CreateCoachingSessionInvoice.outputSchema,
        resolve: createCoachingSessionInvoiceResolver,
    })
    .mutation(SendEmailVerification.TRPC_ROUTE, {
        input: SendEmailVerification.inputSchema,
        output: SendEmailVerification.outputSchema,
        resolve: sendEmailVerificationResolver,
    });
