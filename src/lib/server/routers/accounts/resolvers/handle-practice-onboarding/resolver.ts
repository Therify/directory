import { Context } from '@/lib/server/context';
import { HandlePracticeOnboarding } from '@/lib/features/onboarding';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    HandlePracticeOnboarding.Input,
    HandlePracticeOnboarding.Output
> = async function handlePracticeOnboarding({
    input,
    ctx,
}): Promise<HandlePracticeOnboarding.Output> {
    try {
        const result = await ctx.accounts.handlePracticeOnboarding(input);
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
                    'Failed to onboard practice. Failed on step: ' +
                        erroredStep,
                ],
            };
        }
        return {
            practiceId: result.value.createPracticeEntity.practiceId,
            checkoutSessionId:
                result.value.createStripeCheckoutSession.checkoutSessionId,
            checkourSessionUrl:
                result.value.createStripeCheckoutSession.checkoutSessionUrl,
            errors: [],
        };
    } catch (error) {
        let errorMessage = 'Practice onboarding failed with an unknown error.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            errors: [errorMessage],
        };
    }
};
