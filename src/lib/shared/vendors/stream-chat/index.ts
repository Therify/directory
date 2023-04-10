import { StreamChat } from 'stream-chat';
import { withStreamChatConfiguration } from './configuration';
import { CreateChannel } from './create-channel';
import { CreateToken } from './create-token';
import { DeleteUser } from './delete-user';
import { SendSystemMessageToChannel } from './send-system-message-to-channel';
import { UpsertUser } from './upsert-user';

export const vendorStreamChat = withStreamChatConfiguration((CONFIG) => {
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
        upsertUser: UpsertUser.factory({
            streamChat,
        }),
        deleteUser: DeleteUser.factory({
            streamChat,
        }),
        sendSystemMessageToChannel: SendSystemMessageToChannel.factory({
            streamChat,
        }),
    };
});

export type VendorStreamChat = typeof vendorStreamChat;
