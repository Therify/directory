import { Meta, StoryFn } from '@storybook/react';
import { Button, ButtonProps, BUTTON_SIZE, BUTTON_TYPE } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
};

export default meta;

export const Default: StoryFn<ButtonProps> = (args) => (
    <Button {...args}>Button!</Button>
);
