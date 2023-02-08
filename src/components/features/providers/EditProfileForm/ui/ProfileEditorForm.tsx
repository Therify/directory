import { Divider, Box } from '@mui/material';
import { Control } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { Button, H1 } from '@/components/ui/';
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

interface EditorFormProps {
    control: Control<ProviderProfile>;
    defaultValues?: Partial<ProviderProfile>;
    offersSlidingScale?: boolean;
    isTherapist: boolean;
    minimumRate: number;
    onImageUploadSuccess: (
        error: Error | null,
        result: CloudinaryUploadResult
    ) => void;
    onImageUploadError: (error: string | Error) => void;
}
export const ProfileEditorForm = ({
    control,
    defaultValues,
    offersSlidingScale,
    isTherapist,
    minimumRate,
    onImageUploadSuccess,
    onImageUploadError,
}: EditorFormProps) => {
    return (
        <EditorContainer>
            <EditorForm>
                <H1>Edit Profile</H1>
                <Divider sx={{ mb: 4 }} />
                <MediaUploadWidget
                    onUploadError={onImageUploadError}
                    onUploadSuccess={onImageUploadSuccess}
                />
                <DesignationInput
                    control={control}
                    defaultValue={defaultValues?.designation}
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
                    disabled={false}
                />
                <AboutSection
                    control={control}
                    disabled={false}
                    defaultValues={{
                        bio: defaultValues?.bio ?? undefined,
                        practiceNotes:
                            defaultValues?.practiceNotes ?? undefined,
                        idealClientDescription:
                            defaultValues?.idealClientDescription ?? undefined,
                    }}
                />
                <CredentialsSection
                    control={control}
                    defaultValues={{
                        npiNumber: defaultValues?.npiNumber ?? undefined,
                        licensedStates: defaultValues?.licensedStates,
                    }}
                    disabled={false}
                />
                <PricingInputs
                    control={control}
                    defaultValues={{
                        offersSlidingScale: defaultValues?.offersSlidingScale,
                        minimumRate: defaultValues?.minimumRate,
                        maximumRate: defaultValues?.maximumRate ?? undefined,
                    }}
                    offersSlidingScale={offersSlidingScale}
                    minimumRate={minimumRate}
                />
                <PracticeSection
                    control={control}
                    defaultValues={{
                        acceptedInsurances: defaultValues?.acceptedInsurances,
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
                    disabled={false}
                />
                {/*
                TODO: Add these fields
                licensese
    */}

                {/* 
                <Input
                    label="Education"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                /> */}
                <Button type="contained">Save</Button>
            </EditorForm>
        </EditorContainer>
    );
};

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
