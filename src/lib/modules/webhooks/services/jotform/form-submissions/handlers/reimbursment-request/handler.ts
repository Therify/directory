import { isValid } from 'date-fns';
import { JotformWebhookParams } from '../../../webhookParams';
import { ReimbursementRequest } from '../../../schema';

interface ReimbursementRequestHandlerParams {
    submissionId: string;
    payload: ReimbursementRequest.ReimbursementRequest;
}

const EXCLUDED_ORGANIZATIONS = ['indeed', 'critical mass'];

export const factory =
    ({ accounts }: JotformWebhookParams) =>
    async ({ submissionId, payload }: ReimbursementRequestHandlerParams) => {
        const {
            dateofsession,
            therifydetails,
            provideremail,
            providername,
            practice: practiceName,
            clientemail,
            clientemployer,
        } = payload;
        const dateString = `${dateofsession.year}-${dateofsession.month}-${dateofsession.day}`;
        const dateOfSession = new Date(dateString);
        const isOrganizationKnownInApp = !EXCLUDED_ORGANIZATIONS.includes(
            clientemployer.toLowerCase().trim()
        );
        console.log({ isOrganizationKnownInApp });
        if (!isValid(dateOfSession)) {
            throw new Error('Date of session is invalid!');
        }
        if (therifydetails) {
            const therifyDetails = JSON.parse(therifydetails);
            const result = await accounts.billing.handleReimbursementSubmission(
                {
                    memberId: therifyDetails.memberId,
                    providerProfileId: therifyDetails.providerProfileId,
                    practiceId: therifyDetails.practiceId,
                    dateOfSession: dateOfSession.toISOString(),
                    submissionId,
                }
            );
            if (result.isErr()) {
                let errorMessage = 'Could not handle form submission';
                result.mapErr(([errorStep, error]) => {
                    const message = (error as Error)?.message;
                    const failedStepMessage = `Failed on step: ${errorStep}`;
                    errorMessage = `[handleInvoicePayment error]: ${
                        message ?? failedStepMessage
                    }`;
                });
                throw new Error(`${errorMessage} - ${submissionId}`);
            }
        } else if (isOrganizationKnownInApp) {
            await accounts.billing.handleRawReimbursementSubmission({
                dateOfSession,
                submissionId,
                memberEmail: clientemail,
                provider: {
                    firstName: providername.first,
                    lastName: providername.last,
                    email: provideremail,
                    practiceName,
                },
            });
        }

        return { success: true };
    };
