import { Context } from '@/lib/server/context';
import { CreateCoachingSessionInvoice } from '@/lib/modules/accounts/features/billing';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    CreateCoachingSessionInvoice.Input,
    CreateCoachingSessionInvoice.Output
> = async function ({
    input,
    ctx,
}): Promise<CreateCoachingSessionInvoice.Output> {
    try {
        const { invoiceId } =
            await ctx.accounts.billing.createCoachingSessionInvoice(input);
        return {
            invoiceId,
            errors: [],
        };
    } catch (error) {
        let errorMessage =
            'Creating Stripe session invoice failed with an unknown error.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            invoiceId: null,
            errors: [errorMessage],
        };
    }
};
