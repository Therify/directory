import * as trpc from '@trpc/server';
import {
    FavoriteProfile,
    ListSelfAssessmentsByUserId,
} from '@/lib/features/members';
import {
    favoriteProfileResolver,
    listSelfAssessmentsByUserIdResolver,
} from './resolvers';
import { Context } from '../../context';

export const router = trpc
    .router<Context>()
    .query(ListSelfAssessmentsByUserId.TRPC_ROUTE, {
        input: ListSelfAssessmentsByUserId.inputSchema,
        output: ListSelfAssessmentsByUserId.outputSchema,
        resolve: listSelfAssessmentsByUserIdResolver,
    })
    .mutation(FavoriteProfile.ROUTE, {
        input: FavoriteProfile.inputSchema,
        output: FavoriteProfile.outputSchema,
        resolve: favoriteProfileResolver,
    });
