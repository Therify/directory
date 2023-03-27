import { Context } from '@/lib/server/context';
import { CreateStripeConnectLoginUrl } from '@/lib/modules/accounts/features/billing';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    CreateStripeConnectLoginUrl.Input,
    CreateStripeConnectLoginUrl.Output
> = async function ({
    input,
    ctx,
}): Promise<CreateStripeConnectLoginUrl.Output> {
    try {
        const url = await ctx.accounts.billing.createStripeConnectLoginUrl(
            input
        );
        return {
            url,
            errors: [],
        };
    } catch (error) {
        let errorMessage =
            'Creating Stripe Connect login failed with an unknown error.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            url: null,
            errors: [errorMessage],
        };
    }
};
