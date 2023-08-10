import { Context } from '@/lib/server/context';
import { RemoveCalendarAccess } from '@/lib/modules/scheduling/features';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    RemoveCalendarAccess.Input,
    RemoveCalendarAccess.Output
> = async function ({ input, ctx }): Promise<RemoveCalendarAccess.Output> {
    try {
        const { success } = await ctx.scheduling.removeCalendarAccess(input);
        return {
            success,
            errors: [],
        };
    } catch (error) {
        let errorMessage =
            'Failed to remove calendar access with an unknown error.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            success: false,
            errors: [errorMessage],
        };
    }
};
