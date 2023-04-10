import { StreamChatParams } from '../params';
import { Input, Output } from './schema';

interface SendSystemMessageToChannelParams extends StreamChatParams {}

export const factory = ({ streamChat }: SendSystemMessageToChannelParams) => {
    return async function sendSystemMessageToChannel({
        channelId,
        message,
    }: Input): Promise<Output> {
        const channel = streamChat.channel('messaging', channelId);
        await channel.watch();
        await channel.sendMessage({
            text: message,
            user_id: 'therify',
        });
        return { sent: true };
    };
};
