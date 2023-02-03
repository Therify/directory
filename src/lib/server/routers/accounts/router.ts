import * as trpc from '@trpc/server';
import {
    RegisterProvider,
    SendEmailVerification,
    GetVerificationEmailStatus,
    RegisterMember,
} from '@/lib/features/registration';
import { HandlePracticeOnboarding } from '@/lib/features/onboarding';
import { GetUserDetailsById, GetPracticeByUserId } from '@/lib/features/users';
import { GetProviderProfileByUserId } from '@/lib/features/provider-profiles';
import {
    registerProviderResolver,
    registerMemberResolver,
    sendEmailVerificationResolver,
    getVerificationEmailStatusResolver,
    getUserDetailsByIdResolver,
    handlePracticeOnboardingResolver,
    getPracticeByUserIdResolver,
    getProviderProfileByUserIdResolver,
} from './resolvers';
import { Context } from '../../context';

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
    .query(GetPracticeByUserId.TRPC_ROUTE, {
        input: GetPracticeByUserId.inputSchema,
        output: GetPracticeByUserId.outputSchema,
        resolve: getPracticeByUserIdResolver,
    })
    .query(GetProviderProfileByUserId.TRPC_ROUTE, {
        input: GetProviderProfileByUserId.inputSchema,
        output: GetProviderProfileByUserId.outputSchema,
        resolve: getProviderProfileByUserIdResolver,
    })
    .mutation(HandlePracticeOnboarding.TRPC_ROUTE, {
        input: HandlePracticeOnboarding.inputSchema,
        output: HandlePracticeOnboarding.outputSchema,
        resolve: handlePracticeOnboardingResolver,
    })
    .mutation(RegisterProvider.TRPC_ROUTE, {
        input: RegisterProvider.inputSchema,
        output: RegisterProvider.outputSchema,
        resolve: registerProviderResolver,
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
