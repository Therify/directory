import { Context } from '@/lib/server/context';
import { DeleteProviderProfile } from '@/lib/modules/providers/features/profiles';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    DeleteProviderProfile.Input,
    DeleteProviderProfile.Output
> = async function ({ input, ctx }): Promise<DeleteProviderProfile.Output> {
    try {
        const { success } = await ctx.providers.profiles.deleteProviderProfile(
            input
        );
        return {
            success,
            errors: [],
        };
    } catch (error) {
        let errorMessage = 'Delete profile failed.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            success: false,
            errors: [errorMessage],
        };
    }
};
