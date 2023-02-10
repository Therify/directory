import { FormSectionTitle, FormSectionSubtitle } from '@/components/ui';
import { ProviderProfile } from '@/lib/types';
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
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
    isTherapist?: boolean;
}
export const PracticeSection = ({
    control,
    disabled,
    isTherapist,
}: IdentitySectionProps) => {
    return (
        <Box width="100%">
            <FormSectionTitle>Your Practice</FormSectionTitle>
            <FormSectionSubtitle>Session format</FormSectionSubtitle>
            <TwoInputContainer>
                <OffersInPersonToggle control={control} disabled={disabled} />
                <OffersVirtualToggle control={control} disabled={disabled} />
            </TwoInputContainer>
            <Box marginBottom={4}>
                <FormSectionSubtitle>Consultations</FormSectionSubtitle>
                <OffersPhoneConsultations
                    control={control}
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
                        disabled={disabled}
                    />
                </Box>
            )}
            <InputsContainer>
                <FormSectionSubtitle>Practice</FormSectionSubtitle>
                <SpecialtiesInput control={control} disabled={disabled} />
                <EvidenceBasedApproachInput
                    control={control}
                    disabled={disabled}
                />
                <LanguagesSpokenInput control={control} disabled={disabled} />
                <FormSectionSubtitle>Demographics</FormSectionSubtitle>
                <ModalititesServedInput control={control} disabled={disabled} />
                <AgeGroupsServedServedInput
                    control={control}
                    disabled={disabled}
                />
                <CommunitiesServedInput control={control} disabled={disabled} />
                <ReligionsInput control={control} disabled={disabled} />
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
