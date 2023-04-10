import { Meta, StoryObj } from '@storybook/react';
import { PHQ9Form as PHQ9FormComponent } from './PHQ9Form';

const meta: Meta<typeof PHQ9FormComponent> = {
    title: 'PHQ9Form',
    component: PHQ9FormComponent,
};

export default meta;

export const PHQ9Form: StoryObj<typeof PHQ9FormComponent> = {};
