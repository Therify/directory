import { Context } from '@/lib/server/context';
import { UpdateProviderProfile } from '@/lib/modules/providers/features/profiles';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    UpdateProviderProfile.Input,
    UpdateProviderProfile.Output
> = async function ({ input, ctx }): Promise<UpdateProviderProfile.Output> {
    try {
        const { success } = await ctx.providers.profiles.updateProviderProfile(
            input
        );
        return {
            success,
            errors: [],
        };
    } catch (error) {
        let errorMessage = 'Create profile failed.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            success: false,
            errors: [errorMessage],
        };
    }
};
