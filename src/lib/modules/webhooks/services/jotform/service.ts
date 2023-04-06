import { AccountsService } from '@/lib/modules/accounts/service';
import { JotformWebhookParams } from './webhookParams';
import { handleFormSubmissionsFactory } from './form-submissions';
import { prisma } from '@/lib/prisma';
import { BaseFormSubmission } from './schema';

export const JOTFORM_WEBHOOK_IDENTIFIER = 'JOTFORM_WEBHOOK';

const webhookContext: JotformWebhookParams = {
    prisma,
    accounts: AccountsService,
};

interface JotformWebhookServiceParams {
    formId: string;
    submissionId: string;
    payload: unknown;
}

export const jotformWebhookService = {
    handleFormSubmission: ({
        formId,
        submissionId,
        payload,
    }: JotformWebhookServiceParams) => {
        const handleFormSubmission =
            handleFormSubmissionsFactory(webhookContext);
        return handleFormSubmission({
            formId,
            submissionId,
            payload: BaseFormSubmission.schema.parse(payload),
        });
    },
};

export type JotformWebhookServiceV1 = typeof jotformWebhookService;
