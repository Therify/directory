import { useEffect } from 'react';

declare global {
    interface Window {
        cloudinary: any;
    }
}

interface CreateUploadImageParams {
    cloudName: string;
    uploadPreset: string;
    multiple: boolean;
    sources: string[];
    showAdvancedOptions: boolean;
    folder: string;
    maxImageFileSize: number;
    maxImageWidth: number;
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
}

const DEFAULT_CLOUDINARY_PARAMS: CreateUploadImageParams = {
    cloudName: 'dbrkfldqn',
    uploadPreset: 'rbk8hvus',
    multiple: false,
    sources: ['local', 'url', 'camera', 'facebook', 'instagram'],
    showAdvancedOptions: false,
    folder: 'default',
    maxImageFileSize: 15000000,
    maxImageWidth: 5000,
};

export function useCloudinaryWidget({
    buttonRef,
    onUploadResult,
    folder,
}: UseCloudinaryWidgetParams) {
    useEffect(() => {
        let _buttonRef = buttonRef.current;
        const widget = window.cloudinary.createUploadWidget(
            {
                ...DEFAULT_CLOUDINARY_PARAMS,
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
    }, [buttonRef, onUploadResult, folder]);
}
