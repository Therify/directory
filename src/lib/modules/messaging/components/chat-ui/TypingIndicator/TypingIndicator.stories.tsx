import { Meta, StoryFn } from '@storybook/react';
import { TypingIndicator as TypingIndicatorUi } from './TypingIndicator';

export default {
    title: 'Chat/TypingIndicator',
    component: TypingIndicatorUi,
    argTypes: {},
} as Meta;

export const TypingIndicator: StoryFn = () => {
    return <TypingIndicatorUi />;
};
