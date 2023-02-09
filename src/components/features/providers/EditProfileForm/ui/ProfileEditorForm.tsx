import { Divider, Box, useTheme } from '@mui/material';
import { Control } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import {
    Button,
    BUTTON_SIZE,
    BUTTON_TYPE,
    H1,
    IconButton,
} from '@/components/ui/';
import { ProviderProfile } from '@/lib/types/providerProfile';
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
import { State } from '@/lib/types';
import { ChevronLeft } from '@mui/icons-material';
import { useRef } from 'react';
import useOnScreen from '@/lib/hooks/use-on-screen';

interface EditorFormProps {
    control: Control<ProviderProfile>;
    defaultValues?: Partial<ProviderProfile>;
    offersSlidingScale?: boolean;
    isTherapist: boolean;
    minimumRate: number;
    licensedStates?: typeof State.ENTRIES[number][];
    profileImageUrl?: string;
    onImageUploadSuccess: (
        error: Error | null,
        result: CloudinaryUploadResult
    ) => void;
    onImageUploadError: (error: string | Error) => void;
    isFormValid: boolean;
    isSubmittingForm: boolean;
    onSubmitForm: () => Promise<void>;
    onBack?: () => void;
    hideFloatingButton?: boolean;
}
export const ProfileEditorForm = ({
    control,
    defaultValues,
    offersSlidingScale,
    isTherapist,
    minimumRate,
    licensedStates,
    onImageUploadSuccess,
    onImageUploadError,
    profileImageUrl,
    onSubmitForm,
    isSubmittingForm,
    isFormValid,
    onBack,
    hideFloatingButton,
}: EditorFormProps) => {
    const theme = useTheme();
    const headerSaveButtonRef = useRef(null);
    const footerSaveButtonRef = useRef(null);
    // Parent contaner needs to be `position: 'relative'`
    // for the floating button to position correctly
    const isHeaderSaveVisible = useOnScreen(headerSaveButtonRef);
    const isFooterSaveVisible = useOnScreen(footerSaveButtonRef);
    const saveButtonText = 'Save Profile';

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
                        style={{ width: '25%' }}
                        disabled={!isFormValid || isSubmittingForm}
                        isLoading={isSubmittingForm}
                        onClick={onSubmitForm}
                    >
                        {saveButtonText}
                    </FloatingButton>
                )}
                <Divider sx={{ mb: 4 }} />
                <MediaUploadWidget
                    onUploadError={onImageUploadError}
                    onUploadSuccess={onImageUploadSuccess}
                    disabled={isSubmittingForm}
                    buttonText={
                        profileImageUrl ? 'Change Image' : 'Upload Image'
                    }
                />
                <DesignationInput
                    control={control}
                    defaultValue={defaultValues?.designation}
                    disabled={isSubmittingForm}
                />
                <IdentitySection
                    control={control}
                    defaultValues={{
                        givenName: defaultValues?.givenName,
                        surname: defaultValues?.surname,
                        gender: defaultValues?.gender,
                        pronouns: defaultValues?.pronouns,
                        ethnicities: defaultValues?.ethnicity,
                        contactEmail: defaultValues?.contactEmail,
                    }}
                    disabled={isSubmittingForm}
                />
                <AboutSection
                    control={control}
                    disabled={isSubmittingForm}
                    defaultValues={{
                        bio: defaultValues?.bio ?? undefined,
                        practiceNotes:
                            defaultValues?.practiceNotes ?? undefined,
                        idealClientDescription:
                            defaultValues?.idealClientDescription ?? undefined,
                    }}
                />
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
                    defaultValues={{
                        offersSlidingScale: defaultValues?.offersSlidingScale,
                        minimumRate: defaultValues?.minimumRate,
                        maximumRate: defaultValues?.maximumRate ?? undefined,
                    }}
                    offersSlidingScale={offersSlidingScale}
                    minimumRate={minimumRate}
                    disabled={isSubmittingForm}
                />
                <PracticeSection
                    control={control}
                    defaultValues={{
                        offersInPerson: defaultValues?.offersInPerson,
                        offersMedicationManagement:
                            defaultValues?.offersMedicationManagement,
                        offersPhoneConsultations:
                            defaultValues?.offersPhoneConsultations,
                        offersVirtual: defaultValues?.offersVirtual,
                        specialties: defaultValues?.specialties,
                        religions: defaultValues?.religions,
                        evidenceBasedApproaches:
                            defaultValues?.evidenceBasedPractices,
                    }}
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
}));
