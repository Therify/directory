import '@stream-io/stream-chat-css/dist/css/index.css';
import './style.module.css';

import { StreamChat } from 'stream-chat';
import {
    Channel,
    ChannelList,
    ChannelHeader,
    Chat,
    MessageInput,
    MessageList,
    Thread,
    Window,
} from 'stream-chat-react';
import { styled, Theme } from '@mui/material/styles';
import { useState } from 'react';
import { IconButton } from '@/lib/shared/components/ui';
import { Box, useMediaQuery } from '@mui/material';

import { ChevronLeft } from '@mui/icons-material';

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
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isSmallScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('md')
    );
    if (typeof window !== 'undefined') {
        chatClient.connectUser(
            { id: userIdentifier, name: displayName || userIdentifier },
            accessToken
        );
    }
    const shouldDisplayDrawer = isSmallScreen && drawerOpen;
    return (
        <StyledChatContainer drawerOpen={shouldDisplayDrawer}>
            <Chat client={chatClient} theme="str-chat__theme-square">
                <ChannelList filters={{ members: { $in: [userIdentifier] } }} />
                {shouldDisplayDrawer && (
                    <DrawerBackdrop
                        drawerOpen={drawerOpen}
                        onClick={() => setDrawerOpen(false)}
                    />
                )}
                <Channel>
                    <Window>
                        <ChannelHeader
                            MenuIcon={() => (
                                <IconButton
                                    size="small"
                                    type="outlined"
                                    color="info"
                                    onClick={() => setDrawerOpen(true)}
                                >
                                    <ChevronLeft />
                                </IconButton>
                            )}
                        />
                        <MessageList />
                        <MessageInput />
                    </Window>
                    <Thread />
                </Channel>
            </Chat>
        </StyledChatContainer>
    );
}
const DrawerBackdrop = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'drawerOpen',
})<{ drawerOpen: boolean }>(({ theme, drawerOpen }) => ({
    transition: '.3s',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 999,
    ...(drawerOpen && {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }),
    ...(!drawerOpen && {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        pointerEvents: 'none',
    }),
}));

const StyledChatContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'drawerOpen',
})<{ drawerOpen: boolean }>(({ theme, drawerOpen }) => ({
    '--primary-color': theme.palette.primary.main,
    '--primary-color-faded': theme.palette.primary.light,
    '--red': theme.palette.error.main,
    '--faded-red': theme.palette.error.light,
    '--blue': theme.palette.info.main,
    '--faded-blue': theme.palette.info.light,
    '--green': theme.palette.success.main,
    '--faded-green': theme.palette.success.light,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    '& .str-chat__header-livestream.str-chat__channel-header': {
        paddingLeft: theme.spacing(2),
        '& .str-chat__header-hamburger': {
            height: 'auto',
            width: 'auto',
        },
    },
    ['& .str-chat-channel-list']: {
        width: '300px',
        height: '100%',
        position: 'absolute',
        left: 0,
        transform: `translate3d(${drawerOpen ? '0, 0, 0' : '-301px, 0, 0'})`,
        transition: 'transform 0.3s ease-in-out',
        zIndex: 1000,
        backgroundColor: theme.palette.secondary.light,
        [theme.breakpoints.up('md')]: {
            transform: `translate3d(0, 0, 0)`,
            backgroundColor: theme.palette.background.paper,
            maxWidth: '300px',
            position: 'inherit',
        },
    },
    ['& .str-chat__channel-list-messenger.str-chat__channel-list-messenger-react']:
        {
            backgroundColor: theme.palette.secondary.light,
            display: 'flex',
            flexDirection: 'row',
            width: '100% !important',
            height: '100%',
            '& > div.str-chat__channel-list-messenger__main': {
                padding: theme.spacing(0, 4),
                [theme.breakpoints.up('md')]: {
                    padding: theme.spacing(0),
                    display: 'block',
                },
                width: '100% !important',
                overflowX: 'auto',
                '& button.str-chat__channel-preview-messenger': {
                    // Mobile channel list button
                    padding: theme.spacing(4),
                    marginBottom: theme.spacing(4),
                    [theme.breakpoints.up('md')]: {
                        width: '100%',
                        marginTop: 0,
                    },
                },
            },
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
        '& .str-chat-channel': {
            position: 'relative',
        },
        '& .str-chat__input-flat': {
            width: '100%',
        },
    },
}));
