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

export const jotformWebhookService = {
    handleFormSubmission: (payload: unknown) => {
        const formSubmission = BaseFormSubmission.schema.parse(payload);
        const [_, formId] = formSubmission.slug.split('/');
        const handleFormSubmission =
            handleFormSubmissionsFactory(webhookContext);
        return handleFormSubmission({ formId, payload: formSubmission });
    },
};

export type JotformWebhookServiceV1 = typeof jotformWebhookService;
