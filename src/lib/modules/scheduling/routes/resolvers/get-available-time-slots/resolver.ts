import { Context } from '@/lib/server/context';
import { GetAvailableTimeSlots } from '@/lib/modules/scheduling/features';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    GetAvailableTimeSlots.Input,
    GetAvailableTimeSlots.Output
> = async function ({ input, ctx }): Promise<GetAvailableTimeSlots.Output> {
    try {
        const { availability } = await ctx.scheduling.getAvailableTimeSlots(
            input
        );
        return {
            availability,
            errors: [],
        };
    } catch (error) {
        console.log(error);
        let errorMessage =
            'Failed to get avalability. Experienced an unknown error.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            availability: [],
            errors: [errorMessage],
        };
    }
};
