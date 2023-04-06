import { JotformWebhookParams } from '../../../webhookParams';
import { ReimbursementRequest } from '../../../schema';

export const factory =
    ({ accounts }: JotformWebhookParams) =>
    async (payload: ReimbursementRequest.ReimbursementRequest) => {
        // TODO: call accounts.billing.handleReimbursementRequest(payload)
        console.log('Success!');
        return;
    };
