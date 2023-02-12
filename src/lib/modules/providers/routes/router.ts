import * as trpc from '@trpc/server';

import {
    listPracticeProfilesByUserIdResolver,
    getProviderProfileByUserIdResolver,
    createProviderProfileForPracticeResolver,
} from './resolvers';
import { Context } from '@/lib/server/context';
import {
    GetProviderProfileByUserId,
    ListPracticeProfilesByUserId,
    CreateProviderProfileForPractice,
} from '@/lib/modules/providers/features/profiles';

export const router = trpc
    .router<Context>()
    .query(GetProviderProfileByUserId.TRPC_ROUTE, {
        input: GetProviderProfileByUserId.inputSchema,
        output: GetProviderProfileByUserId.outputSchema,
        resolve: getProviderProfileByUserIdResolver,
    })
    .query(ListPracticeProfilesByUserId.TRPC_ROUTE, {
        input: ListPracticeProfilesByUserId.inputSchema,
        output: ListPracticeProfilesByUserId.outputSchema,
        resolve: listPracticeProfilesByUserIdResolver,
    })
    .mutation(CreateProviderProfileForPractice.TRPC_ROUTE, {
        input: CreateProviderProfileForPractice.inputSchema,
        output: CreateProviderProfileForPractice.outputSchema,
        resolve: createProviderProfileForPracticeResolver,
    });
