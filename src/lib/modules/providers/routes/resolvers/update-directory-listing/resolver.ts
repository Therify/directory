import { Context } from '@/lib/server/context';
import { UpdateDirectoryListing } from '@/lib/modules/providers/features/profiles';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    UpdateDirectoryListing.Input,
    UpdateDirectoryListing.Output
> = async function ({ input, ctx }): Promise<UpdateDirectoryListing.Output> {
    try {
        const { success } = await ctx.providers.profiles.updateDirectoryListing(
            input
        );
        return {
            success,
            errors: [],
        };
    } catch (error) {
        console.log(error);
        let errorMessage = 'Update directory listing failed.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            success: false,
            errors: [errorMessage],
        };
    }
};
