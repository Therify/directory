import { Context } from '@/lib/server/context';
import { RegisterDTCMember } from '@/lib/modules/registration/features';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    RegisterDTCMember.Input,
    RegisterDTCMember.Output
> = async function resolveRegisterDTCMember({
    input,
    ctx,
}): Promise<RegisterDTCMember.Output> {
    try {
        const registrationResult = await ctx.accounts.registerDTCMember(input);
        if (registrationResult) {
            return {
                wasSuccessful: true,
                auth0UserId: registrationResult.CREATE_AUTH0_USER.auth0UserId,
                userId: registrationResult.CREATE_THERIFY_USER_ENTRY
                    .therifyUserId,
                errors: [],
            };
        }
        return {
            wasSuccessful: false,
            errors: [],
        };
    } catch (error) {
        let errorMessage = 'Failed to register with an unknown error.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            wasSuccessful: false,
            errors: [errorMessage],
        };
    }
};
