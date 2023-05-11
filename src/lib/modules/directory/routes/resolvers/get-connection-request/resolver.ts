import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';
import { GetConnectionRequest } from '@/lib/modules/directory/features';
import { Context } from '@/lib/server/context';

export const resolve: ProcedureResolver<
    Context,
    GetConnectionRequest.Input,
    GetConnectionRequest.Output
> = async function ({ input, ctx }) {
    try {
        const connectionRequest = await ctx.directory.getConnectionRequest(
            input
        );
        return {
            connectionRequest,
            errors: [],
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                connectionRequest: null,
                errors: [error.message],
            };
        }
        const errorMessage =
            (error as { message: string })?.message ??
            'Could not get connection request.';
        return {
            connectionRequest: null,
            errors: [errorMessage],
        };
    }
};
