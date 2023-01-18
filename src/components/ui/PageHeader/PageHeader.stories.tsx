import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { PageHeader } from './PageHeader';
import { PROPS } from './PageHeader.mock';

const meta: Meta<typeof PageHeader> = {
    title: 'UI/PageHeader',
    component: PageHeader,
};

export default meta;

export const Default: StoryObj<typeof PageHeader> = {
    args: {
        ...PROPS,
    },
};

export const WithActionSlot: StoryObj<typeof PageHeader> = {
    args: {
        ...PROPS,
        actionSlot: <Button>Click Me</Button>,
    },
};
