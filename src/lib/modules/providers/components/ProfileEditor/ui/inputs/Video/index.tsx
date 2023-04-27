import { Button, FormSectionTitle, Modal } from '@/lib/shared/components/ui';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MediaUploadWidget } from '@/lib/modules/media/components';
import {
    CloudinaryUploadResult,
    DEFAULT_CLOUDINARY_PARAMS,
} from '@/lib/modules/media/components/hooks/userCloudinaryWidget';
import { DeleteRounded } from '@mui/icons-material';
import { useState } from 'react';

interface VideoSectionProps {
    onVideoUploadSuccess: (
        error: Error | null,
        result: CloudinaryUploadResult
    ) => void;
    onVideoUploadError: (error: string | Error) => void;
    onDeleteVideo: () => void;
    disabled?: boolean;
    profileVideoUrl?: string;
}
export const VideoSection = ({
    onVideoUploadSuccess,
    onVideoUploadError,
    onDeleteVideo,
    disabled,
    profileVideoUrl,
}: VideoSectionProps) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <Box>
            <FormSectionTitle>Profile Video</FormSectionTitle>
            <ButtonContainer>
                <MediaUploadWidget
                    onUploadError={onVideoUploadError}
                    onUploadSuccess={onVideoUploadSuccess}
                    disabled={disabled}
                    buttonText={
                        profileVideoUrl ? 'Change Video' : 'Upload Video'
                    }
                    cloudinaryParams={{
                        ...DEFAULT_CLOUDINARY_PARAMS,
                        sources: ['local', 'url', 'camera'],
                        resourceType: 'video',
                        clientAllowedFormats: [
                            'mp4',
                            'mov',
                            'avi',
                            'wmv',
                            'flv',
                            'mkv',
                        ],
                    }}
                />
                {profileVideoUrl && (
                    <Button
                        color="info"
                        size="small"
                        type="outlined"
                        startIcon={<DeleteRounded />}
                        onClick={() => setShowModal(true)}
                    >
                        Remove Video
                    </Button>
                )}
            </ButtonContainer>

            <Modal
                isOpen={showModal}
                title="Are you sure you want to remove your profile image?"
                onClose={() => setShowModal(false)}
                primaryButtonOnClick={() => {
                    onDeleteVideo();
                    setShowModal(false);
                }}
                primaryButtonText="Remove Video"
                secondaryButtonText="Cancel"
                secondaryButtonOnClick={() => setShowModal(false)}
            />
        </Box>
    );
};

const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
        marginBottom: theme.spacing(2),
    },
    '& button': {
        width: '100%',
    },
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        '& > *': {
            marginBottom: 0,
        },
        '& .MuiAvatar-root': {
            marginRight: theme.spacing(2),
        },
        '& button': {
            width: 'inherit',
            '&:first-of-type': {
                marginRight: theme.spacing(2),
            },
        },
    },
}));
