import * as trpc from '@trpc/server';
import {
    RegisterProvider,
    SendEmailVerification,
    GetVerificationEmailStatus,
} from '@/lib/features/registration';
import { HandlePracticeOnboarding } from '@/lib/features/onboarding';
import { GetPlanStatus } from '@/lib/features/users';
import {
    registerProviderResolver,
    sendEmailVerificationResolver,
    getVerificationEmailStatusResolver,
    getPlanStatusResolver,
    handlePracticeOnboardingResolver,
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
    .mutation(SendEmailVerification.TRPC_ROUTE, {
        input: SendEmailVerification.inputSchema,
        output: SendEmailVerification.outputSchema,
        resolve: sendEmailVerificationResolver,
    });
