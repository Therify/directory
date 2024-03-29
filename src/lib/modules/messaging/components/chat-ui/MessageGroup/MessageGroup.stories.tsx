import { Meta, StoryFn } from '@storybook/react';
import { subMinutes } from 'date-fns';
import {
    MessageGroup as MessageGroupUi,
    MessageGroupProps,
} from './MessageGroup';

export default {
    title: 'Chat/MessageGroup',
    component: MessageGroupUi,
    argTypes: {},
} as Meta;

export const MessageGroup: StoryFn = () => {
    return <MessageGroupUi {...props} />;
};

export const MyMessageGroup: StoryFn = () => {
    return <MessageGroupUi {...props} isMine />;
};

const props: MessageGroupProps = {
    messages: [
        {
            id: '1',
            content: 'Hello!',
            timestamp: new Date(),
        },
        {
            id: '2',
            content:
                'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
            timestamp: subMinutes(new Date(), 3),
        },
        {
            id: '3',
            content: 'Hello World!',
            timestamp: subMinutes(new Date(), 5),
        },
    ],
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/300',
    isOnline: true,
    isMine: false,
};
