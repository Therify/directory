import * as trpc from '@trpc/server';
import {
    RegisterProvider,
    SendEmailVerification,
    GetVerificationEmailStatus,
    RegisterMember,
} from '@/lib/features/registration';
import { HandlePracticeOnboarding } from '@/lib/features/onboarding';
import { GetPlanStatus, GetPracticeByUserId } from '@/lib/features/users';
import {
    registerProviderResolver,
    registerMemberResolver,
    sendEmailVerificationResolver,
    getVerificationEmailStatusResolver,
    getPlanStatusResolver,
    handlePracticeOnboardingResolver,
    getPracticeByUserIdResolver,
} from './resolvers';
import { Context } from '../../context';

export const router = trpc
    .router<Context>()
    .query(GetVerificationEmailStatus.TRPC_ROUTE, {
        input: GetVerificationEmailStatus.inputSchema,
        output: GetVerificationEmailStatus.outputSchema,
        resolve: getVerificationEmailStatusResolver,
    })
    .query(GetPlanStatus.TRPC_ROUTE, {
        input: GetPlanStatus.inputSchema,
        output: GetPlanStatus.outputSchema,
        resolve: getPlanStatusResolver,
    })
    .query(GetPracticeByUserId.TRPC_ROUTE, {
        input: GetPracticeByUserId.inputSchema,
        output: GetPracticeByUserId.outputSchema,
        resolve: getPracticeByUserIdResolver,
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
