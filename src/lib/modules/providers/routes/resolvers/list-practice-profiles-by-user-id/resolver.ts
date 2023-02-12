import { Context } from '@/lib/server/context';
import { ListPracticeProfilesByUserId } from '@/lib/modules/providers/features/profiles';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    ListPracticeProfilesByUserId.Input,
    ListPracticeProfilesByUserId.Output
> = async function resolveListPracticeProfilesByUserId({
    input,
    ctx,
}): Promise<ListPracticeProfilesByUserId.Output> {
    try {
        const { profiles } =
            await ctx.providers.profiles.listPracticeProfilesByUserId(input);
        return {
            profiles,
            errors: [],
        };
    } catch (error) {
        let errorMessage =
            "There was a problem getting your practice's profiles.";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            profiles: [],
            errors: [errorMessage],
        };
    }
};
