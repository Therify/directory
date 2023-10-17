import {
    CloudinaryUploadResult,
    CreateUploadImageParams,
    useCloudinaryWidget,
} from '@/lib/modules/media/components/hooks/userCloudinaryWidget';
import { styled } from '@mui/material/styles';
import React from 'react';
interface MediaUploadWidgetProps {
    folder?: string;
    buttonText?: string;
    disabled?: boolean;
    onUploadSuccess: (
        error: Error | null,
        result: CloudinaryUploadResult
    ) => void;
    onUploadError: (error: Error | string) => void;
    cloudinaryParams?: CreateUploadImageParams;
}

export const ImageUploadButton = React.memo(
    function MediaUploadWidget({
        onUploadSuccess,
        onUploadError,
        disabled,
        folder,
        buttonText = 'Upload Image',
        cloudinaryParams,
    }: MediaUploadWidgetProps) {
        const buttonRef = React.useRef<HTMLButtonElement>(null);
        useCloudinaryWidget({
            buttonRef,
            folder,
            params: cloudinaryParams,
            onUploadResult(error, result) {
                if (!error && result && result.event === 'success') {
                    onUploadSuccess(null, result);
                    return;
                }
                if (error) {
                    onUploadError(error);
                }
            },
        });
        return (
            <UploadButton ref={buttonRef} disabled={disabled}>
                {buttonText}
            </UploadButton>
        );
    },
    (prevProps, nextProps) => {
        return (
            prevProps.disabled === nextProps.disabled &&
            prevProps.buttonText === nextProps.buttonText
        );
    }
);

const UploadButton = styled('button')(({ theme }) => ({
    textDecoration: 'underline',
    background: 'transparent',
    border: 'none',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    padding: 0,
    margin: 0,
}));
