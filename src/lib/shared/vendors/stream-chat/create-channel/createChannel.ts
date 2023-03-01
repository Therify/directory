import { adaptUserIdentifier } from '../adapt-user-identifier';
import { StreamChatParams } from '../params';
import { Input, Output } from './schema';

interface CreateChannelParams extends StreamChatParams {}

export const factory = ({ streamChat }: CreateChannelParams) => {
    /**
     * @see - https://getstream.io/chat/docs/node/creating_channels/?language=javascript#2.-creating-a-channel-for-a-list-of-members
     */
    return async function createChannel({ members }: Input): Promise<Output> {
        const channel = streamChat.channel('messaging', {
            name: `${members[0].givenName} | ${members[1].givenName}`,
            members: adaptUserIdentifier.makeManySafe(members.map((m) => m.id)),
            created_by_id: 'therify',
        });
        const {
            channel: { id },
        } = await channel.create();
        return { channelId: id };
    };
};
