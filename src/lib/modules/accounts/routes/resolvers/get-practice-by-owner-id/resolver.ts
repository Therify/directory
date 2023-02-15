import { Context } from '@/lib/server/context';
import { GetPracticeByOwnerId } from '@/lib/modules/users/features';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    GetPracticeByOwnerId.Input,
    GetPracticeByOwnerId.Output
> = async function resolveGetPlanStatus({
    input,
    ctx,
}): Promise<GetPracticeByOwnerId.Output> {
    try {
        const { practice } = await ctx.accounts.getPracticeByOwnerId(input);
        return {
            practice,
            errors: [],
        };
    } catch (error) {
        let errorMessage = 'There was a problem getting your practice.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            practice: null,
            errors: [errorMessage],
        };
    }
};
