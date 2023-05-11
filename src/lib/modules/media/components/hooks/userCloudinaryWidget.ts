import { useEffect } from 'react';

declare global {
    interface Window {
        cloudinary: any;
    }
}

export interface CreateUploadImageParams {
    cloudName: string;
    uploadPreset: string;
    multiple: boolean;
    sources: string[];
    showAdvancedOptions: boolean;
    folder: string;
    maxImageFileSize: number;
    maxImageWidth: number;
    cropping?: boolean;
    resourceType?: 'image' | 'raw' | 'video' | 'auto';
    showSkipCropButton?: boolean;
    croppingCoordinatesMode?: 'custom' | 'face' | 'adv_face' | 'adv_eager';
    clientAllowedFormats?: string[];
}

export interface CloudinaryUploadResult {
    event: string;
    info: {
        original_filename: string;
        secure_url: string;
    };
}

interface OnUploadResultCallback {
    (error: Error | string, result: CloudinaryUploadResult): void;
}

interface UseCloudinaryWidgetParams {
    buttonRef: React.RefObject<HTMLButtonElement>;
    onUploadResult: OnUploadResultCallback;
    folder?: string;
    params?: CreateUploadImageParams;
}

export const DEFAULT_CLOUDINARY_PARAMS: CreateUploadImageParams = {
    cloudName: 'dbrkfldqn',
    uploadPreset: 'rbk8hvus',
    multiple: false,
    sources: ['local', 'url', 'camera', 'facebook', 'instagram'],
    showAdvancedOptions: false,
    folder: 'default',
    maxImageFileSize: 15000000,
    maxImageWidth: 5000,
    resourceType: 'image',
    cropping: true,
    showSkipCropButton: false,
    croppingCoordinatesMode: 'face',
    clientAllowedFormats: [
        'jpg',
        'png',
        'jpeg',
        'gif',
        'video/mp4',
        'video/quicktime',
        'video/x-msvideo',
    ],
};

export function useCloudinaryWidget({
    buttonRef,
    onUploadResult,
    folder,
    params,
}: UseCloudinaryWidgetParams) {
    const uploadParams = params || DEFAULT_CLOUDINARY_PARAMS;
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        let _buttonRef = buttonRef.current;
        const widget = window.cloudinary.createUploadWidget(
            {
                ...uploadParams,
                folder: folder || DEFAULT_CLOUDINARY_PARAMS.folder,
            },
            onUploadResult
        );
        if (!buttonRef.current) return;
        const handleClick = () => {
            widget.open();
        };
        buttonRef.current.addEventListener('click', handleClick);
        return () => {
            if (!_buttonRef) return;
            _buttonRef.removeEventListener('click', handleClick);
        };
    }, [buttonRef, onUploadResult, folder, uploadParams]);
}
