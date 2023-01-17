import { Context } from '@/lib/server/context';
import { GetPlanStatus } from '@/lib/features/users';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    GetPlanStatus.Input,
    GetPlanStatus.Output
> = async function resolveGetPlanStatus({
    input,
    ctx,
}): Promise<GetPlanStatus.Output> {
    try {
        const result = await ctx.accounts.getPlanStatusByUserId(input);
        return {
            ...result,
            errors: [],
        };
    } catch (error) {
        let errorMessage = 'Status could not be checked.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            status: null,
            errors: [errorMessage],
        };
    }
};
