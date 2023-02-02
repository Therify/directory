import * as trpc from '@trpc/server';
import { GetSelfAssessmentsByUserId } from '@/lib/features/members';
import { getSelfAssessmentsByUserIdResolver } from './resolvers';
import { Context } from '../../context';

export const router = trpc
    .router<Context>()
    .query(GetSelfAssessmentsByUserId.TRPC_ROUTE, {
        input: GetSelfAssessmentsByUserId.inputSchema,
        output: GetSelfAssessmentsByUserId.outputSchema,
        resolve: getSelfAssessmentsByUserIdResolver,
    });
