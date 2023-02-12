import * as trpc from '@trpc/server';

import {
    listPracticeProfilesByUserIdResolver,
    getProviderProfileByUserIdResolver,
} from './resolvers';
import { Context } from '@/lib/server/context';
import {
    GetProviderProfileByUserId,
    ListPracticeProfilesByUserId,
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
    });
