import { Divider, Box, useTheme } from '@mui/material';
import { Control } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import {
    Avatar,
    Button,
    BUTTON_SIZE,
    BUTTON_TYPE,
    FormSectionTitle,
    H1,
    IconButton,
} from '@/components/ui/';
import {
    PricingInputs,
    PracticeSection,
    DesignationInput,
    IdentitySection,
    AboutSection,
    CredentialsSection,
} from './inputs';
import { MediaUploadWidget } from '@/components/features/media';
import { CloudinaryUploadResult } from '@/components/features/media/hooks/userCloudinaryWidget';
import { State, ProviderProfile } from '@/lib/types';
import { ChevronLeft } from '@mui/icons-material';
import { useRef } from 'react';
import useOnScreen from '@/lib/hooks/use-on-screen';
import { ProfileType } from '@prisma/client';
import { ImageSection } from './inputs/Image';

interface EditorFormProps {
    control: Control<ProviderProfile.ProviderProfile>;
    defaultValues?: Partial<ProviderProfile.ProviderProfile>;
    isFormValid: boolean;
    isSubmittingForm: boolean;
    licensedStates?: typeof State.ENTRIES[number][];
    onImageUploadSuccess: (
        error: Error | null,
        result: CloudinaryUploadResult
    ) => void;
    onImageUploadError: (error: string | Error) => void;
    onDeleteImage: () => void;
    onSubmitForm: () => Promise<void>;
    onBack?: () => void;
    hideFloatingButton?: boolean;
    watchedProfileValues: {
        id: ProviderProfile.ProviderProfile['id'];
        designation: ProviderProfile.ProviderProfile['designation'];
        profileImageUrl: ProviderProfile.ProviderProfile['profileImageUrl'];
        offersSlidingScale: ProviderProfile.ProviderProfile['offersSlidingScale'];
        minimumRate: ProviderProfile.ProviderProfile['minimumRate'];
    };
}
export const ProfileEditorForm = ({
    control,
    defaultValues,
    licensedStates,
    onDeleteImage,
    onImageUploadSuccess,
    onImageUploadError,
    onSubmitForm,
    isSubmittingForm,
    isFormValid,
    onBack,
    hideFloatingButton,
    watchedProfileValues,
}: EditorFormProps) => {
    const theme = useTheme();
    const headerSaveButtonRef = useRef(null);
    const footerSaveButtonRef = useRef(null);
    // Parent container needs to be `position: 'relative'`
    // for the floating button to position correctly
    const isHeaderSaveVisible = useOnScreen(headerSaveButtonRef);
    const isFooterSaveVisible = useOnScreen(footerSaveButtonRef);
    const saveButtonText = watchedProfileValues.id
        ? 'Save Changes'
        : 'Create Profile';
    const isTherapist =
        watchedProfileValues.designation === ProfileType.therapist;
    // TODO: Add supervisor input
    return (
        <EditorContainer>
            <EditorForm>
                {onBack && (
                    <Box>
                        <IconButton
                            color="info"
                            type={BUTTON_TYPE.TEXT}
                            onClick={onBack}
                            disabled={isSubmittingForm}
                            style={{ marginRight: theme.spacing(4) }}
                        >
                            <ChevronLeft />
                        </IconButton>
                    </Box>
                )}
                <HeaderContainer marginBottom={4}>
                    <H1 style={{ margin: 0 }}>Profile Editor</H1>
                    <Button
                        ref={headerSaveButtonRef}
                        fullWidth={false}
                        type="contained"
                        disabled={!isFormValid || isSubmittingForm}
                        isLoading={isSubmittingForm}
                        onClick={onSubmitForm}
                    >
                        {saveButtonText}
                    </Button>
                </HeaderContainer>
                {!hideFloatingButton && (
                    <FloatingButton
                        showButton={
                            !isHeaderSaveVisible && !isFooterSaveVisible
                        }
                        type="contained"
                        size={BUTTON_SIZE.LARGE}
                        disabled={!isFormValid || isSubmittingForm}
                        isLoading={isSubmittingForm}
                        onClick={onSubmitForm}
                    >
                        {saveButtonText}
                    </FloatingButton>
                )}
                <Divider sx={{ mb: 4 }} />
                <FormSectionTitle style={{ marginTop: 0 }}>
                    Profile Type
                </FormSectionTitle>
                <DesignationInput
                    control={control}
                    disabled={isSubmittingForm}
                />
                <ImageSection
                    onDeleteImage={onDeleteImage}
                    onImageUploadError={onImageUploadError}
                    onImageUploadSuccess={onImageUploadSuccess}
                    profileImageUrl={
                        watchedProfileValues.profileImageUrl ?? undefined
                    }
                    disabled={isSubmittingForm}
                />
                <IdentitySection
                    control={control}
                    disabled={isSubmittingForm}
                />
                <AboutSection control={control} disabled={isSubmittingForm} />
                {isTherapist && (
                    <CredentialsSection
                        control={control}
                        defaultValues={{
                            npiNumber: defaultValues?.npiNumber ?? undefined,
                        }}
                        licensedStates={licensedStates}
                        disabled={isSubmittingForm}
                    />
                )}
                <PricingInputs
                    control={control}
                    offersSlidingScale={watchedProfileValues.offersSlidingScale}
                    minimumRate={watchedProfileValues.minimumRate}
                    disabled={isSubmittingForm}
                />
                <PracticeSection
                    control={control}
                    isTherapist={isTherapist}
                    disabled={isSubmittingForm}
                />

                {/* 
                <Input
                    label="Education"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                /> */}
                <Button
                    ref={footerSaveButtonRef}
                    fullWidth={false}
                    type="contained"
                    disabled={!isFormValid || isSubmittingForm}
                    isLoading={isSubmittingForm}
                    onClick={onSubmitForm}
                >
                    {saveButtonText}
                </Button>
            </EditorForm>
        </EditorContainer>
    );
};
const HeaderContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(4),
}));

const EditorContainer = styled(Box)(({ theme }) => ({
    background: theme.palette.background.default,
    padding: theme.spacing(4),
    width: '100%',
    height: '100%',
    overflow: 'auto',
}));

const EditorForm = styled('form')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: theme.spacing(4),
}));

const FloatingButton = styled(Button, {
    shouldForwardProp: (prop) => 'showButton' !== prop,
})<{
    showButton: boolean;
}>(({ theme, showButton }) => ({
    position: 'absolute',
    right: showButton ? theme.spacing(3) : '-100%',
    bottom: theme.spacing(3),
    padding: theme.spacing(2),
    zIndex: 1,
    transition: 'right 0.3s ease-in-out',
    minWidth: '25%',
    maxWidth: '100%',
}));
