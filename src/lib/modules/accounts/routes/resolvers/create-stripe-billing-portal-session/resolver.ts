import { Context } from '@/lib/server/context';
import { CreateStripeBillingPortalSession } from '@/lib/modules/accounts/features/billing';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    CreateStripeBillingPortalSession.Input,
    CreateStripeBillingPortalSession.Output
> = async function ({
    input,
    ctx,
}): Promise<CreateStripeBillingPortalSession.Output> {
    try {
        const { billingPortalUrl } =
            await ctx.accounts.billing.createStripeBillingPortalSession(input);
        return {
            billingPortalUrl,
            errors: [],
        };
    } catch (error) {
        let errorMessage =
            'Creating Stripe billing portal session failed with an unknown error.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            billingPortalUrl: null,
            errors: [errorMessage],
        };
    }
};
