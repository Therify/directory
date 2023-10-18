import {
    CloudinaryUploadResult,
    CreateUploadImageParams,
    useCloudinaryWidget,
} from '@/lib/modules/media/components/hooks/userCloudinaryWidget';
import { styled } from '@mui/material/styles';
import React from 'react';
import { UnderlinedButton } from '../../ui/UnderLinedButton';
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
            <UnderlinedButton ref={buttonRef} disabled={disabled}>
                {buttonText}
            </UnderlinedButton>
        );
    },
    (prevProps, nextProps) => {
        return (
            prevProps.disabled === nextProps.disabled &&
            prevProps.buttonText === nextProps.buttonText
        );
    }
);
