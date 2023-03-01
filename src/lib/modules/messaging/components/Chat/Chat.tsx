import '@stream-io/stream-chat-css/dist/css/index.css';
import './style.module.css';

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
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface ChatComponentProps {
    userIdentifier: string;
    accessToken: string;
    displayName?: string;
}

const chatClient = StreamChat.getInstance('7ryxym6g8a33');

export function ChatComponent({
    userIdentifier,
    accessToken,
    displayName,
}: ChatComponentProps) {
    if (typeof window !== 'undefined') {
        chatClient.connectUser(
            { id: userIdentifier, name: displayName || userIdentifier },
            accessToken
        );
    }
    return (
        <StyledChatContainer>
            <Chat client={chatClient} theme="str-chat__theme-square">
                <ChannelList filters={{ members: { $in: [userIdentifier] } }} />
                <Channel>
                    <Window>
                        <MessageList />
                        <MessageInput />
                    </Window>
                    <Thread />
                </Channel>
            </Chat>
        </StyledChatContainer>
    );
}

const StyledChatContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    ['& .str-chat-channel-list']: {
        flex: 'unset',
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
    },
    ['& .str-chat__channel-list-messenger.str-chat__channel-list-messenger-react']:
        {
            backgroundColor: theme.palette.secondary.light,
            display: 'flex',
            flexDirection: 'row',
            width: '100% !important',
        },
    ['& .str-chat-channel.str-chat__channel']: {
        overflowY: 'auto',
        height: '100%',
        padding: `0 ${theme.spacing(2)}`,
    },
    ['& .str-chat__reverse-infinite-scroll.str-chat__message-list-scroll']: {
        paddingTop: 0,
        paddingBottom: 75,
    },
    ['& .str-chat__message-input']: {
        position: 'absolute',
        bottom: 0,
    },
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        ['& .str-chat-channel-list']: {
            backgroundColor: theme.palette.background.paper,
            maxWidth: '300px',
        },
        ['& .str-chat-channel.str-chat__channel']: {
            flex: 1,
        },
    },
}));
