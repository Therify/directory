import { Context } from '@/lib/server/context';
import * as trpc from '@trpc/server';
import { CreateConnectionRequest } from '../features';
import { createConnectionRequestResolver } from './resolvers/create-connection-request';

export const router = trpc
    .router<Context>()
    .mutation(CreateConnectionRequest.TRPC_ROUTE, {
        input: CreateConnectionRequest.inputSchema,
        output: CreateConnectionRequest.outputSchema,
        resolve: createConnectionRequestResolver,
    });
