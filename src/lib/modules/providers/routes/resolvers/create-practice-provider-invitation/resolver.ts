import { Context } from '@/lib/server/context';
import { CreatePracticeProviderInvitation } from '@/lib/modules/providers/features/invitations';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';
import { VendorInngest } from '@/lib/shared/vendors/inngest/inngest';
import { SendJoinPracticeEmail } from '@/lib/shared/vendors/inngest';
import { URL_PATHS } from '@/lib/sitemap';

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
    const { invitationId, recipientEmail } = result.value.createInvitation;

    const invitationLink = `${process.env.APPLICATION_URL}${URL_PATHS.PROVIDERS.PRACTICE.JOIN}/${invitationId}`;
    const practiceName = result.value.getPractice.practiceName;

    await VendorInngest.send(SendJoinPracticeEmail.EVENT_NAME, {
        data: {
            to: [recipientEmail, 'help@therify.co'],
            props: {
                invitationLink,
                practiceName,
            },
            subject: `Join ${practiceName} on Therify`,
        },
    });
    return {
        invitationId: result.value.createInvitation.invitationId,
        errors: [],
    };
};
