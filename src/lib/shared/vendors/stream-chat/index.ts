import { StreamChat } from 'stream-chat';
import { withStreamChatConfiguration } from './configuration';
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
    };
});

export type VendorStreamChat = typeof streamChat;
