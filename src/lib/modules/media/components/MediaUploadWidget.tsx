import { Button } from '@/lib/shared/components/ui/Button';
import { SxProps, Theme } from '@mui/material/styles';
import { UploadFile } from '@mui/icons-material';
import { useRef } from 'react';
import {
    CloudinaryUploadResult,
    CreateUploadImageParams,
    useCloudinaryWidget,
} from './hooks/userCloudinaryWidget';
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
    sx?: SxProps<Theme>;
    cloudinaryParams?: CreateUploadImageParams;
}

export const MediaUploadWidget = React.memo(
    function MediaUploadWidget({
        onUploadSuccess,
        onUploadError,
        disabled,
        folder,
        buttonText = 'Upload Image',
        sx,
        cloudinaryParams,
    }: MediaUploadWidgetProps) {
        const buttonRef = useRef<HTMLButtonElement>(null);
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
            <Button
                ref={buttonRef}
                disabled={disabled}
                startIcon={<UploadFile />}
                size="small"
                sx={sx}
            >
                {buttonText}
            </Button>
        );
    },
    (prevProps, nextProps) => {
        return (
            prevProps.disabled === nextProps.disabled &&
            prevProps.buttonText === nextProps.buttonText
        );
    }
);
