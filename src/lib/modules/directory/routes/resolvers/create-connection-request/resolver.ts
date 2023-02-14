import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';
import { CreateConnectionRequest } from '@/lib/modules/directory/features';
import { Context } from '@/lib/server/context';

export const resolve: ProcedureResolver<
    Context,
    CreateConnectionRequest.Input,
    CreateConnectionRequest.Output
> = async function ({ input, ctx }) {
    return ctx.directory.createConnectionRequest(input);
};
