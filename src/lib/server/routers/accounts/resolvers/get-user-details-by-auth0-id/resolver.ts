import { Context } from '@/lib/server/context';
import { GetUserDetailsByAuth0Id } from '@/lib/features/users';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    GetUserDetailsByAuth0Id.Input,
    GetUserDetailsByAuth0Id.Output
> = async function resolveGetUserDetailsByAuth0Id({
    input,
    ctx,
}): Promise<GetUserDetailsByAuth0Id.Output> {
    try {
        const result = await ctx.accounts.getUserDetailsByAuth0Id(input);
        return {
            ...result,
            errors: [],
        };
    } catch (error) {
        let errorMessage = 'User details could not be fetched.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            details: null,
            errors: [errorMessage],
        };
    }
};
