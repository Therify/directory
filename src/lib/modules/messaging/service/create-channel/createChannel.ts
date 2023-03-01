import * as CreateChannel from '../../features/create-channel';
import { MessageServiceParams } from '../params';

interface CreateChannelParams extends MessageServiceParams {}

export const factory = ({ prisma, streamChat }: CreateChannelParams) => {
    /**
     * Create a new channel between two users (member, provider)
     * At this point in time, channels are only created between coaches and members
     * @param input {CreateChannel.Input}
     */
    return async function createChannel(
        input: CreateChannel.Input
    ): Promise<CreateChannel.Output> {
        const { memberId, profileId } = input;
        const [member, providerProfile] = await Promise.all([
            prisma.user.findUniqueOrThrow({
                where: { id: memberId },
            }),
            prisma.providerProfile.findUnique({
                where: { id: profileId },
                include: { user: true },
            }),
        ]);
        const shouldNotCreateChannel =
            // * If the provider does not have a user, it means they cannot be messaged
            !providerProfile?.user ||
            // ! Therapists at this time cannot be messaged
            providerProfile.designation === 'therapist' ||
            !providerProfile.offersChat;
        if (shouldNotCreateChannel) return { channelId: undefined };
        if (providerProfile.user === null) return { channelId: undefined };
        if (!member.chatAccessToken || !providerProfile.user.chatAccessToken) {
            if (!member.chatAccessToken) {
                await streamChat.upsertUser({
                    userIdentifier: member.id,
                });
                const { accessToken } = streamChat.createToken({
                    userIdentifier: member.id,
                });
                await prisma.user.update({
                    where: { id: member.id },
                    data: { chatAccessToken: accessToken },
                });
            }
            if (!providerProfile.user.chatAccessToken) {
                await streamChat.upsertUser({
                    userIdentifier: providerProfile.user.id,
                });
                const { accessToken } = streamChat.createToken({
                    userIdentifier: providerProfile.user?.id!,
                });
                await prisma.user.update({
                    where: { id: providerProfile.user?.id! },
                    data: { chatAccessToken: accessToken },
                });
            }
        }
        const providerUser = providerProfile.user;
        const channel = await streamChat.createChannel({
            members: [member, providerUser],
        });
        await prisma.channel.create({
            data: {
                id: channel.channelId,
                memberId: member.id,
                providerId: providerUser.id,
            },
        });
        return channel;
    };
};
