import { Context } from '@/lib/server/context';
import { CreatePracticeProviderInvitation } from '@/lib/modules/providers/features/invitations';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    CreatePracticeProviderInvitation.Input,
    CreatePracticeProviderInvitation.Output
> = async function ({
    input,
    ctx,
}): Promise<CreatePracticeProviderInvitation.Output> {
    const result =
        await ctx.providers.invitations.createPracticeProviderInvitation(input);

    if (result.isErr()) {
        let errorMessage = 'Could not create invitation.';
        result.mapErr(([erroredStep, error]) => {
            console.log(
                'Create practice provider invitation for practice failed on step: ' +
                    erroredStep,
                error
            );
            if (error instanceof Error) {
                errorMessage = error.message;
            }
        });
        return {
            invitationId: null,
            errors: [errorMessage],
        };
    }

    /**
     *  TODO: Send email to recipient
     **/
    return {
        invitationId: result.value.createInvitation.invitationId,
        errors: [],
    };
};
