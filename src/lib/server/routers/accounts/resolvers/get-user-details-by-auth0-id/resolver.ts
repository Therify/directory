import { Context } from '@/lib/server/context';
import { GetUserDetailsById } from '@/lib/features/users';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    GetUserDetailsById.Input,
    GetUserDetailsById.Output
> = async function resolveGetUserDetailsById({
    input,
    ctx,
}): Promise<GetUserDetailsById.Output> {
    try {
        const { user } = await ctx.accounts.getUserDetailsById(input);
        let firebaseToken: string | undefined;
        if (user)
            firebaseToken = await ctx.accounts.createFirebaseAuthToken({
                userId: user.userId,
                email: user.emailAddress,
            });
        return {
            user: user
                ? {
                      ...user,
                      firebaseToken,
                  }
                : null,
            errors: [],
        };
    } catch (error) {
        let errorMessage = 'User details could not be fetched.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            user: null,
            errors: [errorMessage],
        };
    }
};
