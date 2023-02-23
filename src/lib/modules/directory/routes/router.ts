import { Context } from '@/lib/server/context';
import * as trpc from '@trpc/server';
import {
    CreateConnectionRequest,
    UpdateConnectionRequestStatus,
} from '../features';
import {
    createConnectionRequestResolver,
    updateConnectionRequestStatusResolver,
} from './resolvers';

export const router = trpc
    .router<Context>()
    .mutation(CreateConnectionRequest.TRPC_ROUTE, {
        input: CreateConnectionRequest.inputSchema,
        output: CreateConnectionRequest.outputSchema,
        resolve: createConnectionRequestResolver,
    })
    .mutation(UpdateConnectionRequestStatus.TRPC_ROUTE, {
        input: UpdateConnectionRequestStatus.inputSchema,
        output: UpdateConnectionRequestStatus.outputSchema,
        resolve: updateConnectionRequestStatusResolver,
    });
