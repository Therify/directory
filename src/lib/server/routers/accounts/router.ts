import * as trpc from '@trpc/server';
import {
    RegisterProvider,
    SendEmailVerification,
    GetVerificationEmailStatus,
} from '@/lib/features/registration';
import { HandlePracticeOnboarding } from '@/lib/features/onboarding';
import {
    GetUserDetailsByAuth0Id,
    GetPracticeByUserId,
} from '@/lib/features/users';
import {
    registerProviderResolver,
    sendEmailVerificationResolver,
    getVerificationEmailStatusResolver,
    getUserDetailsByAuth0IdResolver,
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
    .query(GetUserDetailsByAuth0Id.TRPC_ROUTE, {
        input: GetUserDetailsByAuth0Id.inputSchema,
        output: GetUserDetailsByAuth0Id.outputSchema,
        resolve: getUserDetailsByAuth0IdResolver,
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
    .mutation(SendEmailVerification.TRPC_ROUTE, {
        input: SendEmailVerification.inputSchema,
        output: SendEmailVerification.outputSchema,
        resolve: sendEmailVerificationResolver,
    });
