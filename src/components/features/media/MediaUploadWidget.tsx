import { Button } from '@/components/ui/Button';
import { Box } from '@mui/material';
import { UploadFile } from '@mui/icons-material';
import { useRef } from 'react';
import {
    CloudinaryUploadResult,
    useCloudinaryWidget,
} from './hooks/userCloudinaryWidget';

interface MediaUploadWidgetProps {
    folder?: string;
    buttonText?: string;
    onUploadSuccess: (
        error: Error | null,
        result: CloudinaryUploadResult
    ) => void;
    onUploadError: (error: Error | string) => void;
}

export function MediaUploadWidget({
    onUploadSuccess,
    onUploadError,
    folder,
    buttonText = 'Upload Image',
}: MediaUploadWidgetProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    useCloudinaryWidget({
        buttonRef,
        folder,
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
        <Box>
            <Button ref={buttonRef} startIcon={<UploadFile />} size="small">
                {buttonText}
            </Button>
        </Box>
    );
}
