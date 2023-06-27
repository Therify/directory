import { TherifyUser } from '@/lib/shared/types';
import { adaptUserIdentifier } from '@/lib/shared/vendors/stream-chat/adapt-user-identifier';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';

const chatClient = StreamChat.getInstance('7ryxym6g8a33');

export const useChatClient = (user?: TherifyUser.TherifyUser) => {
    const [isChatConnected, setIsChatConnected] = useState(false);
    const [unreadChatMessagesCount, setChatUnreadMessagesCount] = useState(0);
    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (!isChatConnected && user?.hasChatEnabled && user?.userId) {
            const userIdentifier = adaptUserIdentifier.makeStreamChatSafe(
                user.userId
            );
            const displayName = user.givenName;
            const accessToken = user.chatAccessToken!;
            chatClient
                .connectUser(
                    { id: userIdentifier, name: displayName || userIdentifier },
                    accessToken
                )
                .then(() => {
                    setIsChatConnected(true);
                })
                .catch((e) => {
                    console.error(e);
                    setIsChatConnected(false);
                });
        }
    }, [
        isChatConnected,
        user?.chatAccessToken,
        user?.givenName,
        user?.hasChatEnabled,
        user?.userId,
    ]);
    //TODO: fetch initial unread count on load
    useEffect(() => {
        if (user?.hasChatEnabled && user?.userId && isChatConnected) {
            const { unsubscribe } = chatClient.on((event) => {
                if (
                    event.total_unread_count !== undefined &&
                    !isNaN(parseInt(event.total_unread_count?.toString() ?? ''))
                ) {
                    console.log(
                        `unread messages count is now: ${event.total_unread_count}`
                    );
                    setChatUnreadMessagesCount(event.total_unread_count);
                }
            });
            return () => unsubscribe();
        }
    }, [isChatConnected, user?.hasChatEnabled, user?.userId]);

    const ChatProvider = useMemo(
        () =>
            function MemoizedChat({ children }: { children?: ReactNode }) {
                return (
                    <Chat client={chatClient} theme="str-chat__theme-square">
                        {children}
                    </Chat>
                );
            },
        []
    );
    return { ChatProvider, unreadChatMessagesCount, isChatConnected };
};
