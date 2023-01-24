import { Context } from '@/lib/server/context';
import { GetPracticeByUserId } from '@/lib/features/users';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    GetPracticeByUserId.Input,
    GetPracticeByUserId.Output
> = async function resolveGetPlanStatus({
    input,
    ctx,
}): Promise<GetPracticeByUserId.Output> {
    try {
        const { practice } = await ctx.accounts.getPracticeByUserId(input);
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
