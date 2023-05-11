import { Meta, StoryObj } from '@storybook/react';
import { MediaUploadWidget } from './MediaUploadWidget';
import { DEFAULT_CLOUDINARY_PARAMS } from './hooks/userCloudinaryWidget';

const meta: Meta<typeof MediaUploadWidget> = {
    title: 'MediaUploadWidget',
    component: MediaUploadWidget,
};

export default meta;

export const Default: StoryObj<typeof MediaUploadWidget> = {
    args: {
        onUploadSuccess: console.log,
        onUploadError: console.error,
        buttonText: 'Upload Image',
        cloudinaryParams: {
            ...DEFAULT_CLOUDINARY_PARAMS,
            showAdvancedOptions: true,
            cropping: true,
            croppingCoordinatesMode: 'custom',
        },
    },
};

export const VideoUpload: StoryObj<typeof MediaUploadWidget> = {
    args: {
        onUploadSuccess: console.log,
        onUploadError: console.error,
        buttonText: 'Upload Video',
        cloudinaryParams: {
            ...DEFAULT_CLOUDINARY_PARAMS,
            sources: ['local', 'url', 'camera'],
            resourceType: 'video',
            clientAllowedFormats: ['mp4', 'mov', 'avi', 'wmv', 'flv', 'mkv'],
        },
    },
};
