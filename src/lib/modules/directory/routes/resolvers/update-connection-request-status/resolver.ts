import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';
import { UpdateConnectionRequestStatus } from '@/lib/modules/directory/features';
import { Context } from '@/lib/server/context';

export const resolve: ProcedureResolver<
    Context,
    UpdateConnectionRequestStatus.Input,
    UpdateConnectionRequestStatus.Output
> = async function ({ input, ctx }) {
    try {
        const { success } = await ctx.directory.updateConnectionRequestStatus(
            input
        );
        return {
            success,
            errors: [],
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                errors: [error.message],
            };
        }
        return {
            success: false,
            errors: ['There was an error updating the connection request.'],
        };
    }
};
