import { Divider, Box } from '@mui/material';
import { Control } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { Button, H1 } from '@/components/ui/';
import { ProviderProfile } from '@/lib/types/providerProfile';
import {
    GivenNameInput,
    SurnameInput,
    ContactEmailInput,
    BioInput,
    NpiNumberInput,
    PricingInputs,
    OffersInPersonToggle,
    OffersMedicationManagement,
    OffersPhoneConsultations,
    OffersVirtualToggle,
    IdealClientDescriptionInput,
    PronounsInput,
    PracticeNotesInput,
    GenderInput,
    DesignationInput,
    LicensedStatesInput,
    AcceptedInsurancesInput,
    SpecialtiesInput,
    EthnicitiesInput,
    ReligionsInput,
    EvidenceBasedApproachInput,
    LanguagesSpokenInput,
} from './inputs';

interface EditorFormProps {
    onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    control: Control<ProviderProfile>;
    defaultValues?: Partial<ProviderProfile>;
    offersSlidingScale?: boolean;
}
export const ProfileEditorForm = ({
    onSelectFile,
    control,
    defaultValues,
    offersSlidingScale,
}: EditorFormProps) => {
    return (
        <EditorContainer>
            <EditorForm>
                <H1>Edit Profile</H1>
                <Divider sx={{ mb: 4 }} />
                <input type="file" onChange={onSelectFile} />
                <DesignationInput
                    control={control}
                    defaultValue={defaultValues?.designation}
                />
                <GivenNameInput
                    control={control}
                    defaultValue={defaultValues?.givenName}
                />
                <SurnameInput
                    control={control}
                    defaultValue={defaultValues?.surname}
                />
                <PronounsInput
                    control={control}
                    defaultValue={defaultValues?.pronouns}
                />
                <GenderInput
                    control={control}
                    defaultValue={defaultValues?.gender}
                />
                <ContactEmailInput
                    control={control}
                    defaultValue={defaultValues?.contactEmail}
                />
                <BioInput
                    control={control}
                    defaultValue={defaultValues?.bio ?? undefined}
                />
                <PracticeNotesInput
                    control={control}
                    defaultValue={defaultValues?.practiceNotes ?? undefined}
                />
                <IdealClientDescriptionInput
                    control={control}
                    defaultValue={
                        defaultValues?.idealClientDescription ?? undefined
                    }
                />
                <LicensedStatesInput
                    control={control}
                    defaultValue={defaultValues?.licensedStates}
                />
                <AcceptedInsurancesInput
                    control={control}
                    defaultValue={defaultValues?.acceptedInsurances}
                />
                <NpiNumberInput
                    control={control}
                    defaultValue={defaultValues?.npiNumber ?? undefined}
                />
                <OffersInPersonToggle
                    control={control}
                    defaultValue={defaultValues?.offersInPerson}
                />
                <OffersMedicationManagement
                    control={control}
                    defaultValue={defaultValues?.offersMedicationManagement}
                />
                <OffersPhoneConsultations
                    control={control}
                    defaultValue={defaultValues?.offersPhoneConsultations}
                />
                <OffersVirtualToggle
                    control={control}
                    defaultValue={defaultValues?.offersVirtual}
                />
                <PricingInputs
                    control={control}
                    defaultValues={{
                        offersSlidingScale: defaultValues?.offersSlidingScale,
                        minimumRate: defaultValues?.minimumRate,
                        maximumRate: defaultValues?.maximumRate ?? undefined,
                    }}
                    offersSlidingScale={offersSlidingScale}
                />
                <SpecialtiesInput
                    control={control}
                    defaultValue={defaultValues?.specialties}
                />
                <EthnicitiesInput
                    control={control}
                    defaultValue={defaultValues?.ethnicity}
                />
                <ReligionsInput
                    control={control}
                    defaultValue={defaultValues?.religions}
                />
                <EvidenceBasedApproachInput
                    control={control}
                    defaultValue={defaultValues?.evidenceBasedPractices}
                />
                <LanguagesSpokenInput
                    control={control}
                    defaultValue={defaultValues?.languagesSpoken}
                />
                {/*
                TODO: Add these fields
                licenses
                yearsOfExperience
                communitiesServed
                modalities
                ageGroups
    practiceStartDate
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
    flexDirection: 'column',
    gap: theme.spacing(4),
}));
