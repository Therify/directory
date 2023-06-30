import { StreamChatWebhookParams } from '../webhookParams';
import { handleMessagesFactory } from './messages';
import { NewMessageEvent } from '../schema';
import { UnknownStreamChatEventTypeError } from '../errors';

interface HandleEventParams {
    type: string;
    event: unknown;
}
export const handleEventFactory =
    (context: StreamChatWebhookParams) =>
    ({ type, event }: HandleEventParams) => {
        const messageHandlers = handleMessagesFactory(context);
        switch (type) {
            case 'message.new':
                return messageHandlers.newMessage(
                    NewMessageEvent.schema.parse(event)
                );
            default:
                handleUnknownEvent(type);
        }
    };

const handleUnknownEvent = (type: string) => {
    console.log(`Unexpected event type: ${type}`);
    if (process.env.NODE_ENV !== 'development') {
        throw new UnknownStreamChatEventTypeError(type);
    }
};
