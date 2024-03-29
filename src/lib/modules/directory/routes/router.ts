import { Context } from '@/lib/server/context';
import * as trpc from '@trpc/server';
import {
    CreateConnectionRequest,
    GetConnectionRequest,
    UpdateConnectionRequestStatus,
} from '../features';
import {
    createConnectionRequestResolver,
    updateConnectionRequestStatusResolver,
    getConnectionRequestResolver,
} from './resolvers';

export const router = trpc
    .router<Context>()
    .query(GetConnectionRequest.TRPC_ROUTE, {
        input: GetConnectionRequest.inputSchema,
        output: GetConnectionRequest.outputSchema,
        resolve: getConnectionRequestResolver,
    })
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
