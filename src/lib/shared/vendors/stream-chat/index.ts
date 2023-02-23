import { StreamChat } from 'stream-chat';
import { withStreamChatConfiguration } from './configuration';
import { CreateChannel } from './create-channel';
import { CreateToken } from './create-token';

export const streamChat = withStreamChatConfiguration((CONFIG) => {
    const streamChat = new StreamChat(
        CONFIG.STREAM_CHAT_API_KEY,
        CONFIG.STREAM_CHAT_SECRET_KEY
    );
    return {
        createToken: CreateToken.factory({
            streamChat,
        }),
        createChannel: CreateChannel.factory({
            streamChat,
        }),
    };
});

export type VendorStreamChat = typeof streamChat;
