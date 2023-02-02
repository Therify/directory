import * as trpc from '@trpc/server';
import { ListSelfAssessmentsByUserId } from '@/lib/features/members';
import { listSelfAssessmentsByUserIdResolver } from './resolvers';
import { Context } from '../../context';

export const router = trpc
    .router<Context>()
    .query(ListSelfAssessmentsByUserId.TRPC_ROUTE, {
        input: ListSelfAssessmentsByUserId.inputSchema,
        output: ListSelfAssessmentsByUserId.outputSchema,
        resolve: listSelfAssessmentsByUserIdResolver,
    });
