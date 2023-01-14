import { Context } from '@/lib/server/context';
import { RegisterProvider } from '@/lib/features/registration';
// import {  } from '@/lib/vendors/stripe';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    RegisterProvider.Input,
    RegisterProvider.Output
> = async function resolveRegisterProvider({
    input,
    ctx,
}): Promise<RegisterProvider.Output> {
    // TODO: Remove once registration opens
    if (input.emailAddress.split('@')[1] !== 'therify.co') {
        return {
            wasSuccessful: false,
            errors: ['Registration is not open.'],
        };
    }
    const registrationResult = await ctx.accounts.registerProvider(input);
    if (registrationResult.isErr()) {
        let errorMessage = 'Registration failed.';
        registrationResult.mapErr(([erroredStep, error]) => {
            console.log('Registration failed on step: ' + erroredStep, error);
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
