import { adaptUserIdentifier } from '@/lib/shared/vendors/stream-chat/adapt-user-identifier';
import { NewMessageEvent } from '../../schema';
import { StreamChatWebhookParams } from '../../webhookParams';
import { Role } from '@prisma/client';
import { URL_PATHS } from '@/lib/sitemap';
const APPLICATION_URL = process.env.APPLICATION_URL ?? 'https://app.therify.co';
export const handleNewMessageFactory =
    ({ prisma, notifications }: StreamChatWebhookParams) =>
    async (newMessageEvent: NewMessageEvent.Type) => {
        const senderId = adaptUserIdentifier.fromStreamChat(
            newMessageEvent.message.user.id
        );
        const userIds = newMessageEvent.members.map((member) => {
            return adaptUserIdentifier.fromStreamChat(member.user_id);
        });
        const users = await prisma.user.findMany({
            where: {
                id: {
                    in: userIds,
                },
            },
            select: {
                id: true,
                emailAddress: true,
                givenName: true,
                surname: true,
                roles: true,
            },
        });
        const sender = users.find((user) => user.id === senderId);
        const recipients = users.filter((user) => {
            return user.id !== senderId;
        });
        if (!sender) throw new Error('No sender found');

        const recipientsWithPresence = await Promise.all(
            recipients.map(async (user) => {
                const presence = await notifications.getUserPresence(user.id);
                return {
                    ...user,
                    ...presence,
                };
            })
        );
        const offlineUsers = recipientsWithPresence.filter(
            (user) => !user.isOnline
        );

        if (offlineUsers.length > 0) {
            const { members, coaches } = offlineUsers.reduce(
                (acc, user) => {
                    if (user.roles.includes(Role.provider_coach)) {
                        return {
                            ...acc,
                            coaches: [...acc.coaches, user],
                        };
                    }
                    return {
                        ...acc,
                        members: [...acc.members, user],
                    };
                },
                {
                    members: [],
                    coaches: [],
                } as {
                    members: typeof offlineUsers;
                    coaches: typeof offlineUsers;
                }
            );

            if (coaches.length > 0) {
                await notifications.email.sendNewMessageEmail({
                    sender: {
                        id: sender.id,
                        name: `${sender.givenName ?? ''} ${
                            sender.surname ?? ''
                        }`.trim(),
                    },
                    recipients: coaches.map(
                        ({ givenName, id, surname, emailAddress: email }) => ({
                            id,
                            givenName,
                            surname,
                            email,
                        })
                    ),
                    messageUrl:
                        APPLICATION_URL + URL_PATHS.PROVIDERS.COACH.CHAT,
                });
            }
            if (members.length > 0) {
                await notifications.email.sendNewMessageEmail({
                    sender: {
                        id: sender.id,
                        name: `${sender.givenName ?? ''} ${
                            sender.surname ?? ''
                        }`.trim(),
                    },
                    recipients: members.map(
                        ({ givenName, id, surname, emailAddress: email }) => ({
                            id,
                            givenName,
                            surname,
                            email,
                        })
                    ),
                    messageUrl: APPLICATION_URL + URL_PATHS.MEMBERS.CHAT,
                });
            }
        }

        return {
            success: true,
        };
    };
