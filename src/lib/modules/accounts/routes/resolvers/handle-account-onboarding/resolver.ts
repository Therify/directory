import { Context } from '@/lib/server/context';
import { HandleAccountOnboarding } from '@/lib/modules/onboarding/features';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    HandleAccountOnboarding.Input,
    HandleAccountOnboarding.Output
> = async function handleAccountOnboarding({
    input,
    ctx,
}): Promise<HandleAccountOnboarding.Output> {
    try {
        const result = await ctx.accounts.handleAccountOnboarding(input);
        if (result.isErr()) {
            const { error: errorOutput } = result;
            const [erroredStep, error] = errorOutput;
            if (error instanceof Error) {
                return {
                    errors: [error.message],
                };
            }
            return {
                errors: [
                    'Failed to onboard account. Failed on step: ' + erroredStep,
                ],
            };
        }
        return {
            accountId: result.value.handleAccountEntity.accountId,
            checkoutSessionId:
                result.value.createStripeCheckoutSession.checkoutSessionId,
            checkoutSessionUrl:
                result.value.createStripeCheckoutSession.checkoutSessionUrl,
            errors: [],
        };
    } catch (error) {
        let errorMessage = 'Account onboarding failed with an unknown error.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            errors: [errorMessage],
        };
    }
};
