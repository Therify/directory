import { Context } from '@/lib/server/context';
import { GetConnectedCalendarEmails } from '@/lib/modules/scheduling/features';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    GetConnectedCalendarEmails.Input,
    GetConnectedCalendarEmails.Output
> = async function ({
    input,
    ctx,
}): Promise<GetConnectedCalendarEmails.Output> {
    try {
        const { calendarEmails } =
            await ctx.scheduling.getConnectedCalendarEmails(input);
        return {
            calendarEmails,
            errors: [],
        };
    } catch (error) {
        let errorMessage =
            'Failed to get connected calendar emails with an unknown error.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            calendarEmails: [],
            errors: [errorMessage],
        };
    }
};
