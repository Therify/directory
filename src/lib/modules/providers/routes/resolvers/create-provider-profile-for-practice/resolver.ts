import { Context } from '@/lib/server/context';
import { CreateProviderProfileForPractice } from '@/lib/modules/providers/features/profiles';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    CreateProviderProfileForPractice.Input,
    CreateProviderProfileForPractice.Output
> = async function resolveGetPlanStatus({
    input,
    ctx,
}): Promise<CreateProviderProfileForPractice.Output> {
    const result = await ctx.providers.profiles.createProfileForPractice(input);
    if (result.isErr()) {
        let errorMessage = 'Create profile failed.';
        result.mapErr(([erroredStep, error]) => {
            console.log(
                'Create profile for practice failed on step: ' + erroredStep,
                error
            );
            if (error instanceof Error) {
                errorMessage = error.message;
            }
        });
        return {
            profileId: null,
            errors: [errorMessage],
        };
    }
    return {
        profileId: result.value.createProviderProfile.profileId,
        errors: [],
    };
};
