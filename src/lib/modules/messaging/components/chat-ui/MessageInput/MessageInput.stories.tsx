import { Meta, StoryFn } from '@storybook/react';
import { MessageInput as MessageInputUi } from './MessageInput';
import { useState } from 'react';

export default {
    title: 'Chat/MessageInput',
    component: MessageInputUi,
    argTypes: {},
} as Meta;

export const MessageInput: StoryFn = () => {
    const [message, setMessage] = useState('');
    return (
        <MessageInputUi
            value={message}
            onChange={setMessage}
            onSend={() => console.log(message)}
        />
    );
};
