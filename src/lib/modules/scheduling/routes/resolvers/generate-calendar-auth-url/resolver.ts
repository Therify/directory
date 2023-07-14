import { Context } from '@/lib/server/context';
import { GenerateCalendarAuthUrl } from '@/lib/modules/scheduling/features';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    GenerateCalendarAuthUrl.Input,
    GenerateCalendarAuthUrl.Output
> = async function ({ input, ctx }): Promise<GenerateCalendarAuthUrl.Output> {
    try {
        const { authUrl } = await ctx.scheduling.generateCalendarAuthUrl(input);
        return {
            authUrl,
            errors: [],
        };
    } catch (error) {
        let errorMessage =
            'Failed to create an auth url. Experienced an unknown error.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            authUrl: '',
            errors: [errorMessage],
        };
    }
};
