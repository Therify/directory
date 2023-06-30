import { adaptUserIdentifier } from '@/lib/shared/vendors/stream-chat/adapt-user-identifier';
import { NewMessageEvent } from '../../schema';
import { StreamChatWebhookParams } from '../../webhookParams';

export const handleNewMessageFactory =
    ({ prisma, notifications }: StreamChatWebhookParams) =>
    async (newMessageEvent: NewMessageEvent.Type) => {
        const senderId = newMessageEvent.message.user.id;
        const recipientUserIds = newMessageEvent.members.reduce<string[]>(
            (ids, member) => {
                // Filter out sender from channel members
                if (member.user_id === senderId) return ids;
                return [
                    ...ids,
                    adaptUserIdentifier.fromStreamChat(member.user_id),
                ];
            },
            []
        );
        const users = await prisma.user.findMany({
            where: {
                id: {
                    in: recipientUserIds,
                },
            },
            select: {
                id: true,
                emailAddress: true,
            },
        });

        const usersWithPresence = await Promise.all(
            users.map(async (user) => {
                const presence = await notifications.getUserPresence(user.id);
                return {
                    ...user,
                    ...presence,
                };
            })
        );

        // TODO: if offline, send notification
        console.log(usersWithPresence);

        return {
            success: true,
        };
    };
