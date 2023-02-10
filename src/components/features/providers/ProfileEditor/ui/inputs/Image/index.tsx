import {
    Avatar,
    AVATAR_SIZE,
    Button,
    FormSectionTitle,
    Modal,
} from '@/components/ui';
import { Box, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MediaUploadWidget } from '@/components/features/media';
import { CloudinaryUploadResult } from '@/components/features/media/hooks/userCloudinaryWidget';
import { DeleteRounded } from '@mui/icons-material';
import { useState } from 'react';

interface ImageSectionProps {
    onImageUploadSuccess: (
        error: Error | null,
        result: CloudinaryUploadResult
    ) => void;
    onImageUploadError: (error: string | Error) => void;
    onDeleteImage: () => void;
    disabled?: boolean;
    profileImageUrl?: string;
}
export const ImageSection = ({
    onImageUploadSuccess,
    onImageUploadError,
    onDeleteImage,
    disabled,
    profileImageUrl,
}: ImageSectionProps) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <Box>
            <FormSectionTitle>Profile Image</FormSectionTitle>
            <ButtonContainer>
                {profileImageUrl && (
                    <Avatar
                        src={profileImageUrl}
                        alt="Your profile image preview"
                        size={AVATAR_SIZE.XXLARGE}
                    />
                )}
                <MediaUploadWidget
                    onUploadError={onImageUploadError}
                    onUploadSuccess={onImageUploadSuccess}
                    disabled={disabled}
                    buttonText={
                        profileImageUrl ? 'Change Image' : 'Upload Image'
                    }
                />
                {profileImageUrl && (
                    <Button
                        color="info"
                        size="small"
                        type="outlined"
                        startIcon={<DeleteRounded />}
                        onClick={() => setShowModal(true)}
                    >
                        Remove Image
                    </Button>
                )}
            </ButtonContainer>

            <Modal
                isOpen={showModal}
                title="Are you sure you want to remove your profile image?"
                onClose={() => setShowModal(false)}
                primaryButtonOnClick={() => {
                    onDeleteImage();
                    setShowModal(false);
                }}
                primaryButtonText="Remove Image"
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
