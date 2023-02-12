import * as trpc from '@trpc/server';

import { listPracticeProfilesByUserIdResolver } from './resolvers';
import { Context } from '@/lib/server/context';
import { ListPracticeProfilesByUserId } from '@/lib/modules/providers/features/profiles';

export const router = trpc
    .router<Context>()
    .query(ListPracticeProfilesByUserId.TRPC_ROUTE, {
        input: ListPracticeProfilesByUserId.inputSchema,
        output: ListPracticeProfilesByUserId.outputSchema,
        resolve: listPracticeProfilesByUserIdResolver,
    });
