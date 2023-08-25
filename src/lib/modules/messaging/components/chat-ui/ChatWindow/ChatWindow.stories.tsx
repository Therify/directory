import { Meta, StoryFn } from '@storybook/react';
import { ChatWindow as ChatWindowUi } from './ChatWindow';
import { ChatUser, IChannel, Message } from '../types';
import { subMinutes } from 'date-fns';
import { useState } from 'react';

export default {
    title: 'Chat/ChatWindow',
    component: ChatWindowUi,
    argTypes: {},
} as Meta;

export const ChatWindow: StoryFn = () => {
    const [selectedChannelId, setSelectedChannelId] = useState<string>(
        channels[0].id
    );
    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
            }}
        >
            <ChatWindowUi
                channels={channels}
                currentChannelId={selectedChannelId}
                messages={messages}
                channelMembers={users}
                userId={users[1].userId}
                onChannelSelect={setSelectedChannelId}
            />
            ;
        </div>
    );
};

const users: ChatUser[] = [
    {
        userId: '1',
        givenName: 'John',
        surname: 'Doe',
        avatarUrl: 'https://i.pravatar.cc/300',
        status: 'online',
    },
    {
        userId: '2',
        givenName: 'Jane',
        surname: 'Doe',
        avatarUrl: 'https://i.pravatar.cc/300',
        status: 'offline',
    },
];

const messages: Message[] = [
    {
        id: '1',
        content: 'Hello!',
        timestamp: new Date().getTime(),
        authorId: '1',
    },
    {
        id: '2',
        content:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        timestamp: subMinutes(new Date(), 3).getTime(),
        authorId: '1',
    },
    {
        id: '3',
        content: 'Hello World!',
        timestamp: subMinutes(new Date(), 5).getTime(),
        authorId: '2',
    },
    {
        id: '4',
        content:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        timestamp: subMinutes(new Date(), 7).getTime(),
        authorId: '2',
    },
];

const channels: IChannel[] = [
    {
        id: '1',
        title: 'Onboarding',
        caseStatus: 'active',
        lastMessage: messages.filter((message) => message.authorId === '1')[0]
            .content,
        lastMessageTimestamp: subMinutes(new Date(), 5).toISOString(),
        authorAvatarUrl: 'https://i.pravatar.cc/300',
        authorName: 'John Doe',
        authorStatus: 'online',
        unreadMessages: 2,
    },
    {
        id: '2',
        title: 'Recommendations',
        caseStatus: 'resolved',
        lastMessage: 'Hello World!',
        lastMessageTimestamp: subMinutes(new Date(), 25).toISOString(),
        authorAvatarUrl: 'https://i.pravatar.cc/300',
        authorName: 'John Doe',
        authorStatus: 'offline',
        unreadMessages: 0,
    },
];
