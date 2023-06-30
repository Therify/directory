import { StreamChatWebhookParams } from './webhookParams';
import { prisma } from '@/lib/prisma';
import { vendorStreamChat } from '@/lib/shared/vendors/stream-chat';
import { BasePushEvent } from './schema';
import { handleEventFactory } from './event-handlers/handleEvent';
import { notificationsService } from '@/lib/modules/notifications/service';

export const STREAM_CHAT_WEBHOOK_IDENTIFIER = 'STREAM_CHAT_WEBHOOK';

const webhookContext: StreamChatWebhookParams = {
    prisma,
    notifications: notificationsService,
};

interface StreamChatWebhookServiceParams {
    requestBody: string;
    signature: string;
}

export const streamChatWebhookService = {
    handleEvent: ({
        requestBody,
        signature,
    }: StreamChatWebhookServiceParams) => {
        const isValidSignature = vendorStreamChat.verifyWebhookSignature({
            signature,
            requestBody,
        });

        if (!isValidSignature) {
            throw new Error('Invalid Stream Chat event signature.');
        }

        const rawEvent = JSON.parse(requestBody);
        const event = BasePushEvent.schema.parse(rawEvent);

        return handleEventFactory(webhookContext)({ type: event.type, event });
    },
};

export type StreamChatWebhookServiceV1 = typeof streamChatWebhookService;
