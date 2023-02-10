import { Context } from '@/lib/server/context';
import { GetProviderProfileByUserId } from '@/lib/modules/provider-profiles/features';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    GetProviderProfileByUserId.Input,
    GetProviderProfileByUserId.Output
> = async function resolveGetPlanStatus({
    input,
    ctx,
}): Promise<GetProviderProfileByUserId.Output> {
    try {
        const { profile } = await ctx.accounts.getProviderProfileByUserId(
            input
        );
        return {
            profile,
            errors: [],
        };
    } catch (error) {
        let errorMessage = 'There was a problem getting your profile.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            profile: null,
            errors: [errorMessage],
        };
    }
};
