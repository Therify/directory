import { FormSectionTitle } from '@/components/ui/FormElements';
import { ProviderProfile } from '@/lib/types';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Control } from 'react-hook-form';
import { BioInput } from './Bio';
import { IdealClientDescriptionInput } from './IdealClientDescription';
import { PracticeNotesInput } from './PracticeNotes';

interface IdentitySectionProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
}
export const AboutSection = ({ control, disabled }: IdentitySectionProps) => {
    return (
        <Container>
            <FormSectionTitle>About you</FormSectionTitle>
            <BioInput control={control} disabled={disabled} />
            <PracticeNotesInput control={control} disabled={disabled} />
            <IdealClientDescriptionInput
                control={control}
                disabled={disabled}
            />
        </Container>
    );
};

const Container = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
        flex: 1,
    },
}));
