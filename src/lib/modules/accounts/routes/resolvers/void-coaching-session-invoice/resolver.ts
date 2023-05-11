import { Context } from '@/lib/server/context';
import { VoidCoachingSessionInvoice } from '@/lib/modules/accounts/features/billing';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    VoidCoachingSessionInvoice.Input,
    VoidCoachingSessionInvoice.Output
> = async function ({
    input,
    ctx,
}): Promise<VoidCoachingSessionInvoice.Output> {
    try {
        const { voided } =
            await ctx.accounts.billing.voidCoachingSessionInvoice(input);
        return {
            voided,
            errors: [],
        };
    } catch (error) {
        let errorMessage =
            'Voiding Stripe session invoice failed with an unknown error.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            voided: false,
            errors: [errorMessage],
        };
    }
};
