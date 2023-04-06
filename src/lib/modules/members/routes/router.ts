import * as trpc from '@trpc/server';
import {
    CreateSelfAssessment,
    FavoriteProfile,
    ListSelfAssessmentsByUserId,
} from '@/lib/modules/members/features';
import {
    createSelfAssessmentResolver,
    favoriteProfileResolver,
    listSelfAssessmentsByUserIdResolver,
} from './resolvers';
import { Context } from '../../../server/context';

export const router = trpc
    .router<Context>()
    .query(ListSelfAssessmentsByUserId.TRPC_ROUTE, {
        input: ListSelfAssessmentsByUserId.inputSchema,
        output: ListSelfAssessmentsByUserId.outputSchema,
        resolve: listSelfAssessmentsByUserIdResolver,
    })
    .mutation(CreateSelfAssessment.ROUTE, {
        input: CreateSelfAssessment.inputSchema,
        output: CreateSelfAssessment.outputSchema,
        resolve: createSelfAssessmentResolver,
    })
    .mutation(FavoriteProfile.ROUTE, {
        input: FavoriteProfile.inputSchema,
        output: FavoriteProfile.outputSchema,
        resolve: favoriteProfileResolver,
    });
