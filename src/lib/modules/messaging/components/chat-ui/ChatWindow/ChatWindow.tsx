import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { H5, IconButton, Paragraph } from '@/lib/shared/components/ui';
import ModeEditOutlineOutlined from '@mui/icons-material/ModeEditOutlineOutlined';
import { ChannelList } from '../ChannelList';
import { IChannel, Message, ChatUser } from '../types';
import { MessageInput } from '../MessageInput';
import { useMemo, useState } from 'react';
import { MessageGroup } from '../MessageGroup';
import { generateMessageGroups } from '../utils/generateMessageGroups';

interface ChatWindowProps {
    currentChannelId?: string;
    channels: IChannel[];
    messages: Message[];
    channelMembers: ChatUser[];
    userId: string;
    onChannelSelect: (channelId: string) => void;
}

export const ChatWindow = ({
    channels,
    currentChannelId,
    messages,
    channelMembers,
    userId,
    onChannelSelect,
}: ChatWindowProps) => {
    const [message, setMessage] = useState('');
    const messageGroups = useMemo(() => {
        return generateMessageGroups(messages);
    }, [messages]);
    const currentChannel = useMemo(() => {
        return channels.find(
            (channel) => !!currentChannelId && channel.id === currentChannelId
        );
    }, [currentChannelId, channels]);
    const currentChannelMembersById = useMemo(() => {
        return channelMembers.reduce<Record<string, ChatUser>>(
            (acc, member) => {
                acc[member.userId] = member;
                return acc;
            },
            {}
        );
    }, [channelMembers]);

    return (
        <Container>
            <ChannelContainer>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={(theme) => ({
                        padding: theme.spacing(0, 6),
                    })}
                >
                    <H5 margin={0}>Messages</H5>
                    <IconButton size="small" type="text" color="info">
                        <ModeEditOutlineOutlined />
                    </IconButton>
                </Box>
                <ChannelList
                    channels={channels}
                    currentChannelId={currentChannelId}
                    onChannelSelect={onChannelSelect}
                />
            </ChannelContainer>
            <ChatContainer>
                <ChannelTitle>
                    <Paragraph margin={0} size="small">
                        {currentChannel?.title ?? 'Choose a messaging channel'}
                    </Paragraph>
                </ChannelTitle>

                <MessageWindow>
                    <Messages>
                        {messageGroups.map((messageGroup, i) => {
                            const [message] = messageGroup;
                            const author = message?.authorId
                                ? currentChannelMembersById[message.authorId]
                                : undefined;
                            return (
                                <MessageGroup
                                    key={i}
                                    messages={messageGroup}
                                    name={author?.givenName ?? 'Unknown Name'}
                                    avatar={author?.avatarUrl}
                                    status={author?.status ?? 'offline'}
                                    isMine={message?.authorId === userId}
                                />
                            );
                        })}
                    </Messages>
                    <MessageInput
                        isDisabled={
                            !currentChannelId ||
                            !currentChannel ||
                            currentChannel.caseStatus === 'resolved'
                        }
                        value={message}
                        onChange={setMessage}
                        onSend={() => {}}
                    />
                </MessageWindow>
            </ChatContainer>
        </Container>
    );
};

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
}));

const ChannelContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '355px',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 0),
    overflow: 'hidden',
}));

const ChatContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    backgroundColor: theme.palette.grey[50],
}));

const ChannelTitle = styled(Box)(({ theme }) => ({
    background: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center',
    padding: theme.spacing(4),
}));

const MessageWindow = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: theme.spacing(6),
    margin: 'auto',
    maxWidth: '1080px',
    width: '100%',
}));

const Messages = styled(Box)(({ theme }) => ({
    flex: 1,
    overflowY: 'auto',
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column-reverse',
    '&::-webkit-scrollbar': {
        width: '4px',
    },
    '&::-webkit-scrollbar-track': {
        background: theme.palette.grey[100],
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.grey[300],
    },
}));
