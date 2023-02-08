import { Meta, StoryObj } from '@storybook/react';
import { MediaUploadWidget } from './MediaUploadWidget';

const meta: Meta<typeof MediaUploadWidget> = {
    title: 'MediaUploadWidget',
    component: MediaUploadWidget,
};

export default meta;

export const Default: StoryObj<typeof MediaUploadWidget> = {};
