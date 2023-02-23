import { StreamChatParams } from '../params';
import { Input, Output } from './schema';

interface CreateChannelParams extends StreamChatParams {}

export const factory = ({ streamChat }: CreateChannelParams) => {
    return async function createChannel({ members }: Input): Promise<Output> {
        const channel = streamChat.channel('messaging', {
            members,
        });
        const {
            channel: { id },
        } = await channel.create();
        return { channelId: id };
    };
};
