import { Context } from '@/lib/server/context';
import { CreateBillingPortalSession } from '@/lib/modules/accounts/features/billing';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    CreateBillingPortalSession.Input,
    CreateBillingPortalSession.Output
> = async function ({
    input,
    ctx,
}): Promise<CreateBillingPortalSession.Output> {
    try {
        const result = await ctx.accounts.billing.createBillingPortalSession(
            input
        );
        return {
            ...result,
            errors: [],
        };
    } catch (error) {
        let errorMessage =
            'Creating Stripe Billing Portal session failed with an unknown error.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            billingPortalSessionId: null,
            billingPortalSessionUrl: null,
            errors: [errorMessage],
        };
    }
};
