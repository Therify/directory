import { NodeEnvironment } from '@/lib/shared/types';
import { UnknownFormError } from '../errors';
import { JotformWebhookParams } from '../webhookParams';
import { FormHandlers } from './handlers';
import { FORMS, getFormsByEnvironment } from './formIds';
import { ReimbursementRequest } from '../schema';
import { removeQuestionNumbersFromKey } from '../utils';

interface JotformWebhookEvent {
    payload: Record<string, unknown>;
    formId: string;
    submissionId: string;
}
export const handleFormSubmissionsFactory =
    (context: JotformWebhookParams) =>
    ({ formId, submissionId, payload: rawPayload }: JotformWebhookEvent) => {
        const formHandlers = FormHandlers.factory(context);
        const formIds = getFormsByEnvironment(
            process.env.VERCEL_ENV as NodeEnvironment
        );
        const payload: Record<string, unknown> = Object.fromEntries(
            Object.entries(rawPayload).map(([key, value]) => [
                removeQuestionNumbersFromKey(key),
                value,
            ])
        );

        switch (formId) {
            case formIds[FORMS.REIMBURSMENT_REQUEST_V2]:
                return formHandlers.handleReimbursementRequest({
                    submissionId,
                    payload: ReimbursementRequest.schema.parse(payload),
                });
            default:
                handleUnknownForm(formId);
        }
    };

const handleUnknownForm = (formId: string) => {
    console.log(`Unexpected form submission id: ${formId}`);
    if (process.env.NODE_ENV !== 'development') {
        throw new UnknownFormError(formId);
    }
};
