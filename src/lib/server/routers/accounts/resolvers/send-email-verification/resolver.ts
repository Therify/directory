import { Context } from '@/lib/server/context';
import { SendEmailVerification } from '@/lib/features/registration';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    SendEmailVerification.Input,
    SendEmailVerification.Output
> = async function resolveSendEmailVerification({
    input,
    ctx,
}): Promise<SendEmailVerification.Output> {
    try {
        const result = await ctx.accounts.sendEmailVerification(input);
        return {
            ...result,
            errors: [],
        };
    } catch (error) {
        let errorMessage = 'Email could not be sent.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            status: null,
            jobId: null,
            errors: [errorMessage],
        };
    }
};
