import { Divider, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Control } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import {
    Button,
    BUTTON_SIZE,
    BUTTON_TYPE,
    FormSectionTitle,
    H1,
    IconButton,
    Modal,
} from '@/lib/shared/components/ui';
import {
    PricingInputs,
    PracticeSection,
    DesignationInput,
    IdentitySection,
    AboutSection,
    CredentialsSection,
    NewClientStatusInput,
} from './inputs';
import { CloudinaryUploadResult } from '@/lib/modules/media/components/hooks/userCloudinaryWidget';
import { ProviderProfile } from '@/lib/shared/types';
import { ChevronLeft } from '@mui/icons-material';
import { useRef, useState } from 'react';
import useOnScreen from '@/lib/shared/hooks/use-on-screen';
import { ProfileType } from '@prisma/client';
import { ImageSection } from './inputs/Image';

interface EditorFormProps {
    control: Control<ProviderProfile.ProviderProfile>;
    isSubmitDisabled: boolean;
    isSubmittingForm: boolean;
    licensedStates?: ProviderProfile.ProviderProfile['credentials'][number]['state'][];
    onImageUploadSuccess: (
        error: Error | null,
        result: CloudinaryUploadResult
    ) => void;
    onImageUploadError: (error: string | Error) => void;
    onDeleteImage: () => void;
    onSubmitForm: () => void;
    onBack?: () => void;
    onShowProfilePreview?: () => void;
    hideFloatingButton?: boolean;
    setSupervisor: (
        supervisor: ProviderProfile.ProviderProfile['supervisor']
    ) => void;
    watchedProfileValues: {
        id: ProviderProfile.ProviderProfile['id'];
        designation: ProviderProfile.ProviderProfile['designation'];
        profileImageUrl: ProviderProfile.ProviderProfile['profileImageUrl'];
        offersSlidingScale: ProviderProfile.ProviderProfile['offersSlidingScale'];
        offersChat: ProviderProfile.ProviderProfile['offersChat'];
        minimumRate: ProviderProfile.ProviderProfile['minimumRate'];
        givenName: ProviderProfile.ProviderProfile['givenName'];
        surname: ProviderProfile.ProviderProfile['surname'];
        supervisor: ProviderProfile.ProviderProfile['supervisor'];
    };
}
export const ProfileEditorForm = ({
    control,
    licensedStates,
    onDeleteImage,
    onImageUploadSuccess,
    onImageUploadError,
    onSubmitForm,
    isSubmittingForm,
    isSubmitDisabled,
    onBack,
    onShowProfilePreview,
    hideFloatingButton,
    watchedProfileValues,
    setSupervisor,
}: EditorFormProps) => {
    const isNewProfile = !watchedProfileValues.id;
    const theme = useTheme();
    const headerSaveButtonRef = useRef(null);
    const footerSaveButtonRef = useRef(null);
    const [confirmSave, setConfirmSave] = useState(false);

    // Parent container needs to be `position: 'relative'`
    // for the floating button to position correctly
    const isHeaderSaveVisible = useOnScreen(headerSaveButtonRef);
    const isFooterSaveVisible = useOnScreen(footerSaveButtonRef);
    const saveButtonText = isNewProfile ? 'Create Profile' : 'Save Changes';
    const isTherapist =
        watchedProfileValues.designation === ProfileType.therapist;

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
                    <H1>Profile Editor</H1>
                    <Box display="flex">
                        <PreviewProfileButton
                            color="secondary"
                            onClick={() => onShowProfilePreview?.()}
                            style={{
                                marginBottom: 0,
                                marginRight: theme.spacing(2),
                            }}
                        >
                            Preview Profile
                        </PreviewProfileButton>
                        <Button
                            ref={headerSaveButtonRef}
                            fullWidth={false}
                            type="contained"
                            disabled={isSubmitDisabled}
                            isLoading={isSubmittingForm}
                            onClick={() => setConfirmSave(true)}
                        >
                            {saveButtonText}
                        </Button>
                    </Box>
                </HeaderContainer>
                {!hideFloatingButton && (
                    <FloatingButtons
                        showButton={
                            !isHeaderSaveVisible && !isFooterSaveVisible
                        }
                    >
                        <PreviewProfileButton
                            color="secondary"
                            onClick={() => onShowProfilePreview?.()}
                        >
                            Preview Profile
                        </PreviewProfileButton>
                        <Button
                            type="contained"
                            size={BUTTON_SIZE.LARGE}
                            disabled={isSubmitDisabled}
                            isLoading={isSubmittingForm}
                            onClick={() => setConfirmSave(true)}
                        >
                            {saveButtonText}
                        </Button>
                    </FloatingButtons>
                )}
                <Divider sx={{ mb: 4 }} />
                <FormSectionTitle style={{ marginTop: 0 }}>
                    Profile Type
                </FormSectionTitle>
                <DesignationInput
                    control={control}
                    disabled={isSubmittingForm}
                />
                <FormSectionTitle style={{ margin: 0 }}>
                    New Clients
                </FormSectionTitle>
                <NewClientStatusInput
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
                <CredentialsSection
                    isTherapist={isTherapist}
                    supervisor={watchedProfileValues.supervisor}
                    control={control}
                    licensedStates={licensedStates}
                    disabled={isSubmittingForm}
                    setSupervisor={setSupervisor}
                />
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
                <Box width="100%" ref={footerSaveButtonRef}>
                    <PreviewProfileButton
                        color="secondary"
                        fullWidth
                        onClick={() => onShowProfilePreview?.()}
                        style={{ marginBottom: theme.spacing(2) }}
                    >
                        Preview Profile
                    </PreviewProfileButton>
                    <Button
                        fullWidth
                        type="contained"
                        disabled={isSubmitDisabled}
                        isLoading={isSubmittingForm}
                        onClick={() => setConfirmSave(true)}
                    >
                        {saveButtonText}
                    </Button>
                </Box>
            </EditorForm>
            <Modal
                isOpen={confirmSave}
                onClose={() => setConfirmSave(false)}
                title={isNewProfile ? 'Create Profile' : 'Update Profile'}
                message={
                    isNewProfile
                        ? `Are you sure you want to create this profile for ${watchedProfileValues.givenName} ${watchedProfileValues.surname}?`
                        : 'Are you sure you want to save these changes?'
                }
                fullWidthButtons
                primaryButtonText={isNewProfile ? 'Create' : 'Save'}
                primaryButtonOnClick={() => {
                    onSubmitForm();
                    setConfirmSave(false);
                }}
                secondaryButtonText="Cancel"
                secondaryButtonOnClick={() => setConfirmSave(false)}
            />
        </EditorContainer>
    );
};
const HeaderContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    marginBottom: theme.spacing(4),
    justifyContent: 'flex-start',
    flexDirection: 'column',
    '& button': {
        width: '100%',
    },
    '& h1': {
        ...theme.typography.h2,
        marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        '& h1': {
            ...theme.typography.h1,
            marginBottom: 0,
        },
        '& button': {
            width: 'inherit',
        },
    },
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

const PreviewProfileButton = styled(Button)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    display: 'block',
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
}));

const FloatingButtons = styled(Box, {
    shouldForwardProp: (prop) => 'showButton' !== prop,
})<{
    showButton: boolean;
}>(({ theme, showButton }) => ({
    position: 'absolute',
    padding: theme.spacing(2),
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    minWidth: `25%`,
    maxWidth: `calc(100% - ${theme.spacing(6)})`,
    bottom: showButton ? theme.spacing(3) : '-100%',
    right: theme.spacing(3),
    transition: 'bottom 0.2s ease-in-out',
    [theme.breakpoints.up('md')]: {
        right: showButton ? theme.spacing(3) : '-100%',
        bottom: theme.spacing(3),
        transition: 'right 0.3s ease-in-out',
    },
}));
