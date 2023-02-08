import { FormSectionTitle } from '@/components/ui/FormElements';
import { ProviderProfile } from '@/lib/types/providerProfile';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Control } from 'react-hook-form';
import { BioInput } from './Bio';
import { IdealClientDescriptionInput } from './IdealClientDescription';
import { PracticeNotesInput } from './PracticeNotes';

interface IdentitySectionProps {
    control: Control<ProviderProfile>;
    disabled?: boolean;
    defaultValues: {
        bio?: string;
        practiceNotes?: string;
        idealClientDescription?: string;
    };
}
export const AboutSection = ({
    control,
    defaultValues,
    disabled,
}: IdentitySectionProps) => {
    return (
        <Container>
            <FormSectionTitle>About you</FormSectionTitle>
            <BioInput
                control={control}
                defaultValue={defaultValues.bio}
                disabled={disabled}
            />
            <PracticeNotesInput
                control={control}
                defaultValue={defaultValues.practiceNotes}
                disabled={disabled}
            />
            <IdealClientDescriptionInput
                control={control}
                defaultValue={defaultValues.idealClientDescription}
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
