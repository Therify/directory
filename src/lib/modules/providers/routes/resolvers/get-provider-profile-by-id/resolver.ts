import { Context } from '@/lib/server/context';
import { GetProviderProfileById } from '@/lib/modules/providers/features/profiles';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    GetProviderProfileById.Input,
    GetProviderProfileById.Output
> = async function ({ input, ctx }): Promise<GetProviderProfileById.Output> {
    try {
        const { profile } = await ctx.providers.profiles.getProfileById(input);

        return {
            profile,
            errors: [],
        };
    } catch (error) {
        let errorMessage = 'There was a problem getting the profile.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            profile: null,
            errors: [errorMessage],
        };
    }
};
