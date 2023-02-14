import { Context } from '@/lib/server/context';
import { RegisterProviderWithInvitation } from '@/lib/modules/registration/features';
import { Errors as Auth0Errors } from '@/lib/shared/vendors/auth0';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    RegisterProviderWithInvitation.Input,
    RegisterProviderWithInvitation.Output
> = async function resolveRegisterProviderWithInvitation({
    input,
    ctx,
}): Promise<RegisterProviderWithInvitation.Output> {
    const registrationResult =
        await ctx.accounts.registerProviderWithInvitation(input);
    if (registrationResult.isErr()) {
        let errorMessage = 'Registration failed.';
        registrationResult.mapErr(([erroredStep, error]) => {
            console.log('Registration failed on step: ' + erroredStep, error);
            if (
                error instanceof Auth0Errors.createUser.UserAlreadyExistsError
            ) {
                errorMessage = error.message;
            }
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
