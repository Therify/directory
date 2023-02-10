import { z } from 'zod';
import { RegisterMember } from '@/lib/modules/registration/features';
import { prisma } from '@/lib/prisma';
import { TransactionV2 } from '@/lib/shared/utils';
import { vendorAuth0 } from '@/lib/shared/vendors/auth0';

export const TRANSACTION_STEPS = {
    CREATE_THERIFY_USER_ENTRY: 'CREATE_THERIFY_USER_ENTRY',
    CREATE_AUTH0_USER: 'CREATE_AUTH0_USER',
    ASSIGN_AUTH0_ROLE: 'ASSIGN_AUTH0_ROLE',
} as const;

export const INPUT_SCHEMA = RegisterMember.inputSchema;
export const OUTPUT_SCHEMA = {
    [TRANSACTION_STEPS.CREATE_THERIFY_USER_ENTRY]: z.object({
        therifyUserId: z.string(),
    }),
    [TRANSACTION_STEPS.ASSIGN_AUTH0_ROLE]: z.unknown(),
    [TRANSACTION_STEPS.CREATE_AUTH0_USER]: z.object({
        auth0UserId: z.string(),
    }),
};
export const CONTEXT = {
    orm: prisma,
    auth0: vendorAuth0,
} as const;

export type RegisterMemberTransaction = TransactionV2.TransactionDefinition<
    typeof INPUT_SCHEMA,
    typeof OUTPUT_SCHEMA,
    typeof CONTEXT
>;
