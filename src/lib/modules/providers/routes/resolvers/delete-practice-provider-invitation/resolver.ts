import { Context } from '@/lib/server/context';
import { DeletePracticeProviderInvitation } from '@/lib/modules/providers/features/invitations';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    DeletePracticeProviderInvitation.Input,
    DeletePracticeProviderInvitation.Output
> = async function ({
    input,
    ctx,
}): Promise<DeletePracticeProviderInvitation.Output> {
    try {
        const { success } =
            await ctx.providers.invitations.deletePracticeProviderInvitation(
                input
            );
        return {
            success,
            errors: [],
        };
    } catch (error) {
        let errorMessage = 'Delete invitation failed.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            success: false,
            errors: [errorMessage],
        };
    }
};
