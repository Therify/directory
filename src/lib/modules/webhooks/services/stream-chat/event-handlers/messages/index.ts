import { StreamChatWebhookParams } from '../../webhookParams';
import { handleNewMessageFactory } from './newMessage';

export const handleMessagesFactory = (params: StreamChatWebhookParams) => ({
    newMessage: handleNewMessageFactory(params),
});
