import { Context } from '@/lib/server/context';
import { GetVerificationEmailStatus } from '@/lib/features/registration';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    GetVerificationEmailStatus.Input,
    GetVerificationEmailStatus.Output
> = async function resolveGetVerificationEmailStatus({
    input,
    ctx,
}): Promise<GetVerificationEmailStatus.Output> {
    try {
        const result = await ctx.accounts.getVerificationEmailStatus(input);
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
