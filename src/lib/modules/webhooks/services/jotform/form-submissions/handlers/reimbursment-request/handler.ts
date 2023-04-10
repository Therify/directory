import { isValid } from 'date-fns';
import { JotformWebhookParams } from '../../../webhookParams';
import { ReimbursementRequest } from '../../../schema';

interface ReimbursementRequestHandlerParams {
    submissionId: string;
    payload: ReimbursementRequest.ReimbursementRequest;
}

export const factory =
    ({ accounts }: JotformWebhookParams) =>
    async ({ submissionId, payload }: ReimbursementRequestHandlerParams) => {
        const { dateofsession, therifydetails } = payload;
        const dateString = `${dateofsession.year}-${dateofsession.month}-${dateofsession.day}`;
        const date = new Date(dateString);
        const therifyDetails = JSON.parse(therifydetails);
        if (!isValid(date)) {
            throw new Error('Date of session is invalid!');
        }
        const result = await accounts.billing.handleReimbursementSubmission({
            memberId: therifyDetails.memberId,
            providerProfileId: therifyDetails.providerProfileId,
            practiceId: therifyDetails.practiceId,
            dateOfSession: date.toDateString(),
            submissionId,
        });
        if (result.isErr()) {
            let errorMessage = 'Could not handle form submission';
            result.mapErr(([errorStep, error]) => {
                const message = (error as Error)?.message;
                const failedStepMessage = `Failed on step: ${errorStep}`;
                errorMessage = `[handleInvoicePayment error]: ${
                    message ?? failedStepMessage
                }`;
            });
            throw new Error(errorMessage);
        }

        return { success: true };
    };
