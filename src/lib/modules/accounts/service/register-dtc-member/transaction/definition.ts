import { z } from 'zod';
import { RegisterDTCMember } from '@/lib/modules/registration/features';
import { prisma } from '@/lib/prisma';
import { TransactionV2 } from '@/lib/shared/utils';
import { vendorAuth0 } from '@/lib/shared/vendors/auth0';
import { vendorStripe } from '@/lib/shared/vendors/stripe';
import { vendorLaunchDarkly } from '@/lib/shared/vendors/launchdarkly';

export const TRANSACTION_STEPS = {
    CHECK_REGISTRATION_OPEN: 'CHECK_REGISTRATION_OPEN',
    CREATE_THERIFY_USER_ENTRY: 'CREATE_THERIFY_USER_ENTRY',
    CREATE_AUTH0_USER: 'CREATE_AUTH0_USER',
    ASSIGN_AUTH0_ROLE: 'ASSIGN_AUTH0_ROLE',
    CREATE_STRIPE_CUSTOMER: 'CREATE_STRIPE_CUSTOMER',
    UPDATE_THERIFY_USER_ENTRY: 'UPDATE_THERIFY_USER_ENTRY',
} as const;

export const INPUT_SCHEMA = RegisterDTCMember.inputSchema;
export const OUTPUT_SCHEMA = {
    [TRANSACTION_STEPS.CHECK_REGISTRATION_OPEN]: z.object({
        isOpen: z.boolean(),
    }),
    [TRANSACTION_STEPS.CREATE_THERIFY_USER_ENTRY]: z.object({
        therifyUserId: z.string(),
    }),
    [TRANSACTION_STEPS.ASSIGN_AUTH0_ROLE]: z.unknown(),
    [TRANSACTION_STEPS.CREATE_AUTH0_USER]: z.object({
        auth0UserId: z.string(),
    }),
    [TRANSACTION_STEPS.CREATE_STRIPE_CUSTOMER]: z.object({
        customerId: z.string(),
    }),
    [TRANSACTION_STEPS.UPDATE_THERIFY_USER_ENTRY]: z.unknown(),
};
export const CONTEXT = {
    orm: prisma,
    auth0: vendorAuth0,
    stripe: vendorStripe,
    launchDarkly: vendorLaunchDarkly,
} as const;

export type RegisterDTCMemberTransaction = TransactionV2.TransactionDefinition<
    typeof INPUT_SCHEMA,
    typeof OUTPUT_SCHEMA,
    typeof CONTEXT
>;
