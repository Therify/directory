import { Context } from '@/lib/server/context';
import { CreateCoachingSessionCheckout } from '@/lib/modules/accounts/features/billing';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    CreateCoachingSessionCheckout.Input,
    CreateCoachingSessionCheckout.Output
> = async function ({
    input,
    ctx,
}): Promise<CreateCoachingSessionCheckout.Output> {
    try {
        const { checkoutUrl } =
            await ctx.accounts.billing.createCoachingSessionCheckout(input);
        return {
            checkoutUrl,
            errors: [],
        };
    } catch (error) {
        let errorMessage =
            'Creating Stripe checkout session failed with an unknown error.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            checkoutUrl: null,
            errors: [errorMessage],
        };
    }
};
