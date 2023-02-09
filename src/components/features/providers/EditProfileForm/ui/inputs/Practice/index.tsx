import { FormSectionTitle, FormSectionSubtitle } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Control } from 'react-hook-form';
import { SpecialtiesInput } from './Specialties';
import { EvidenceBasedApproachInput } from './EvidenceBasedApproach';
import {
    OffersInPersonToggle,
    OffersVirtualToggle,
    OffersMedicationManagement,
    OffersPhoneConsultations,
} from './ToggleInputs';
import { AgeGroupsServedServedInput } from './AgeGroupsServed';
import { CommunitiesServedInput } from './CommunitiesServed';
import { ModalititesServedInput } from './Modalities';
import { LanguagesSpokenInput } from './LanguagesSpoken';
import { ReligionsInput } from './Religions';

interface IdentitySectionProps {
    control: Control<ProviderProfile>;
    disabled?: boolean;
    defaultValues: {
        offersInPerson?: boolean;
        offersMedicationManagement?: boolean;
        offersPhoneConsultations?: boolean;
        offersVirtual?: boolean;
        specialties?: string[];
        religions?: string[];
        evidenceBasedApproaches?: string[];
        ageGroupsServed?: string[];
        communitiesServed?: string[];
        modalities?: string[];
        languagesSpoken?: string[];
    };
    isTherapist?: boolean;
}
export const PracticeSection = ({
    control,
    defaultValues,
    disabled,
    isTherapist,
}: IdentitySectionProps) => {
    return (
        <Box width="100%">
            <FormSectionTitle>Your Practice</FormSectionTitle>
            <FormSectionSubtitle>Session format</FormSectionSubtitle>
            <TwoInputContainer>
                <OffersInPersonToggle
                    control={control}
                    defaultValue={defaultValues.offersInPerson}
                    disabled={disabled}
                />
                <OffersVirtualToggle
                    control={control}
                    defaultValue={defaultValues.offersInPerson}
                    disabled={disabled}
                />
            </TwoInputContainer>
            <Box marginBottom={4}>
                <FormSectionSubtitle>Consultations</FormSectionSubtitle>
                <OffersPhoneConsultations
                    control={control}
                    defaultValue={defaultValues.offersPhoneConsultations}
                    disabled={disabled}
                />
            </Box>
            {isTherapist && (
                <Box marginBottom={4}>
                    <FormSectionSubtitle>
                        Medication Management
                    </FormSectionSubtitle>
                    <OffersMedicationManagement
                        control={control}
                        defaultValue={defaultValues.offersMedicationManagement}
                        disabled={disabled}
                    />
                </Box>
            )}
            <InputsContainer>
                <FormSectionSubtitle>Practice</FormSectionSubtitle>
                <SpecialtiesInput
                    control={control}
                    defaultValue={defaultValues.specialties}
                    disabled={disabled}
                />
                <EvidenceBasedApproachInput
                    control={control}
                    defaultValue={defaultValues.evidenceBasedApproaches}
                    disabled={disabled}
                />
                <LanguagesSpokenInput
                    control={control}
                    defaultValue={defaultValues.languagesSpoken}
                    disabled={disabled}
                />
                <FormSectionSubtitle>Demographics</FormSectionSubtitle>
                <ModalititesServedInput
                    control={control}
                    defaultValue={defaultValues.modalities}
                    disabled={disabled}
                />
                <AgeGroupsServedServedInput
                    control={control}
                    defaultValue={defaultValues.ageGroupsServed}
                    disabled={disabled}
                />
                <CommunitiesServedInput
                    control={control}
                    defaultValue={defaultValues.communitiesServed}
                    disabled={disabled}
                />
                <ReligionsInput
                    control={control}
                    defaultValue={defaultValues.religions}
                    disabled={disabled}
                />
            </InputsContainer>
        </Box>
    );
};
const InputsContainer = styled(Box)(({ theme }) => ({
    '& > .MuiAutocomplete-root': {
        width: '100%',
        marginBottom: theme.spacing(4),
    },
}));

const TwoInputContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },

    '& > *': {
        marginBottom: theme.spacing(4),
        [theme.breakpoints.up('md')]: {
            width: `calc(50% - ${theme.spacing(1)})`,
            '&:nth-of-type(odd)': {
                marginRight: theme.spacing(1),
            },
            '&:nth-of-type(even)': {
                marginLeft: theme.spacing(1),
            },
        },
    },
}));
