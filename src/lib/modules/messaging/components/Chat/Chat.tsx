import '@stream-io/stream-chat-css/dist/css/index.css';
import './styles.css';

import { useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
    Channel,
    ChannelList,
    Chat,
    MessageInput,
    MessageList,
    Thread,
    Window,
} from 'stream-chat-react';
import { useChat } from '../../hooks';

export function ChatComponent() {
    const [client, setClient] = useState<StreamChat | null>(null);
    useChat({
        setClient,
        user: {
            id: 'test',
            name: 'Test',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdCJ9.9_Iv9P0J0tHRmWUsaXpPv5sAULXDBnRd-oCiWXdFHNg',
        },
    });
    if (!client) return null;
    return (
        <Chat client={client} theme="str-chat__theme-square">
            <ChannelList filters={{ members: { $in: ['test'] } }} />
            <Channel>
                <Window>
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </Chat>
    );
}
