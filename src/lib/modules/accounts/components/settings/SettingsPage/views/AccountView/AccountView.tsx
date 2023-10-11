import { Box, Stack } from '@mui/material';
import { CloudinaryUploadResult } from '@/lib/modules/media/components/hooks/userCloudinaryWidget';
import { TherifyUser } from '@/lib/shared/types';
import {
    FormRenderer,
    Avatar,
    AVATAR_SIZE,
    Paragraph,
} from '@/lib/shared/components/ui';
import { ImageUploadButton } from './ui/ImageUploadButton';
import { accountForm, AccountForm } from './form';

interface AccountViewProps {
    onImageUploadSuccess: (
        error: Error | null,
        result: CloudinaryUploadResult
    ) => void;
    onImageUploadError: (error: string | Error) => void;
    imageUrl?: string;

    user: TherifyUser.TherifyUser;
    onUpdateUserDetails: (user: AccountForm) => void;
}
export const AccountView = ({
    onImageUploadSuccess,
    onImageUploadError,
    imageUrl,
    user,
    onUpdateUserDetails,
}: AccountViewProps) => {
    return (
        <Box>
            <Stack
                justifyContent="flex-start"
                flexDirection="row"
                alignItems="center"
                mb={6}
            >
                <Avatar
                    src={imageUrl}
                    alt="Your profile image preview"
                    size={AVATAR_SIZE.XHUGE}
                />
                <Box px={6}>
                    <Paragraph bold noMargin>
                        Profile Photo
                    </Paragraph>
                    <ImageUploadButton
                        onUploadError={onImageUploadError}
                        onUploadSuccess={onImageUploadSuccess}
                        buttonText={imageUrl ? 'Change Photo' : 'Upload Photo'}
                    />
                </Box>
            </Stack>
            <FormRenderer
                validationSchema={accountForm.schema}
                config={accountForm.config}
                submitButtonText="Save Changes"
                defaultValues={getDefaultValuesFromUser(user)}
                onSubmit={onUpdateUserDetails}
                sx={{
                    maxWidth: 600,
                    '& > div': {
                        padding: 0,
                    },
                }}
            />
        </Box>
    );
};

// TODO: Get this info from member profile query, not therify user
const getDefaultValuesFromUser = (
    user: TherifyUser.TherifyUser
): Partial<AccountForm> => ({
    accountDetails: {
        givenName: user.givenName,
        surname: user.surname,
        emailAddress: user.emailAddress,
        phoneNumber: '',
    },
});
