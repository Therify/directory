import { JotformWebhookParams } from '../../webhookParams';
import { ReimbursementRequest } from './reimbursment-request';

export const factory = (context: JotformWebhookParams) => ({
    handleReimbursementRequest: ReimbursementRequest.factory(context),
});
