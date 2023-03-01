import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { useChatContext } from 'stream-chat-react';

interface UseChatParams {
    setClient: (client: StreamChat) => void;
    user: {
        id: string;
        name: string;
        token: string;
    };
}

export function useChat(params: UseChatParams) {
    const [client] = useState<StreamChat>(new StreamChat('7ryxym6g8a33'));
    useEffect(() => {
        const handleConnectionChange = ({
            online = false,
        }: {
            online?: boolean;
        }) => {
            if (!online) console.log('connection lost');
            params.setClient(client);
        };
        client.on('connection.changed', handleConnectionChange);
        client.connectUser(
            {
                id: params.user.id,
                name: params.user.name,
            },
            params.user.token
        );
        return () => {
            client.off('connection.changed', handleConnectionChange);
            client
                .disconnectUser()
                .then(() => console.info('connection closed'));
        };
    }, [client, params]);
}
