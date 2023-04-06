import { Context } from '@/lib/server/context';
import { HandleStripeConnectOnboarding } from '@/lib/modules/accounts/features/billing';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    HandleStripeConnectOnboarding.Input,
    HandleStripeConnectOnboarding.Output
> = async function handlePracticeOnboarding({
    input,
    ctx,
}): Promise<HandleStripeConnectOnboarding.Output> {
    try {
        const result = await ctx.accounts.billing.handleStripeConnectOnboarding(
            input
        );
        if (result.isErr()) {
            const { error: errorOutput } = result;
            const [erroredStep, error] = errorOutput;
            if (error instanceof Error) {
                return {
                    onboardingUrl: null,
                    errors: [error.message],
                };
            }
            return {
                onboardingUrl: null,
                errors: [
                    'Failed to onboard with Stripe Connect. Failed on step: ' +
                        erroredStep,
                ],
            };
        }
        const onboardingUrl =
            result.value.createOnbordingUrl.stripeConnectOnboardingUrl;
        return {
            onboardingUrl,
            errors: [],
        };
    } catch (error) {
        let errorMessage = 'Practice onboarding failed with an unknown error.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            onboardingUrl: null,
            errors: [errorMessage],
        };
    }
};
