import { Context } from '@/lib/server/context';
import { HandleCalendarAuthCode } from '@/lib/modules/scheduling/features';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    HandleCalendarAuthCode.Input,
    HandleCalendarAuthCode.Output
> = async function ({ input, ctx }): Promise<HandleCalendarAuthCode.Output> {
    try {
        await ctx.scheduling.handleCalendarAuthCode(input);
        return {
            success: true,
            errors: [],
        };
    } catch (error) {
        let errorMessage = 'Token creation was not successful.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            success: false,
            errors: [errorMessage],
        };
    }
};
