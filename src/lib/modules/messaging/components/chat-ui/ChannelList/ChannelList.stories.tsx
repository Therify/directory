import { Meta, StoryFn } from '@storybook/react';
import { subMinutes } from 'date-fns';
import { IChannel } from '../types';
import { ChannelList as ChannelListUi } from './ChannelList';

export default {
    title: 'Chat/ChannelList',
    component: ChannelListUi,
    argTypes: {},
} as Meta;

export const ChannelList: StoryFn = () => {
    return (
        <ChannelListUi
            channels={channels}
            currentChannelId="1"
            onChannelSelect={console.log}
        />
    );
};
const channels: IChannel[] = [
    {
        id: '1',
        title: 'Onboarding',
        caseStatus: 'active',
        lastMessage:
            'Hello World! Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.',
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
