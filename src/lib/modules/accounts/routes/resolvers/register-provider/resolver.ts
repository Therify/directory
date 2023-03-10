import { Context } from '@/lib/server/context';
import { RegisterProvider } from '@/lib/modules/registration/features';
import { Errors as Auth0Errors } from '@/lib/shared/vendors/auth0';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    RegisterProvider.Input,
    RegisterProvider.Output
> = async function resolveRegisterProvider({
    input,
    ctx,
}): Promise<RegisterProvider.Output> {
    const registrationResult = await ctx.accounts.registerProvider(input);
    if (registrationResult.isErr()) {
        let errorMessage = 'Registration failed.';
        registrationResult.mapErr(([erroredStep, error]) => {
            console.log('Registration failed on step: ' + erroredStep, error);
            if (
                error instanceof Auth0Errors.createUser.UserAlreadyExistsError
            ) {
                errorMessage = error.message;
            }
            // if (error instanceof CreateStripeCustomerError) {
            //     errorMessage = 'Registration failed: ' + error.message;
            // }
        });
        return {
            wasSuccessful: false,
            errors: [errorMessage],
        };
    }
    return {
        wasSuccessful: true,
        auth0UserId: registrationResult.value.createAuth0User.auth0UserId,
        userId: registrationResult.value.createTherifyUserEntity.therifyUserId,
        errors: [],
    };
};
