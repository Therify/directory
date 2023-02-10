import { FormSectionTitle } from '@/components/ui/FormElements';
import { ProviderProfile } from '@/lib/types';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Control } from 'react-hook-form';
import { ContactEmailInput } from './ContactEmail';
import { EthnicitiesInput } from './Ethnicities';
import { GenderInput } from './Gender';
import { GivenNameInput } from './GivenName';
import { PronounsInput } from './Pronouns';
import { SurnameInput } from './Surname';

interface IdentitySectionProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
}
export const IdentitySection = ({
    control,
    disabled,
}: IdentitySectionProps) => {
    return (
        <Box width="100%">
            <FormSectionTitle>Your Identity</FormSectionTitle>
            <Box
                display="flex"
                width="100%"
                sx={{
                    '& *:first-of-type': {
                        width: '100%',
                    },
                }}
            >
                <ContactEmailInput control={control} disabled={disabled} />
            </Box>
            <TwoInputContainer>
                <GivenNameInput control={control} disabled={disabled} />
                <SurnameInput control={control} disabled={disabled} />
            </TwoInputContainer>
            <TwoInputContainer>
                <GenderInput control={control} disabled={disabled} />
                <PronounsInput control={control} disabled={disabled} />
            </TwoInputContainer>
            <Box marginTop={8}>
                <EthnicitiesInput control={control} disabled={disabled} />
            </Box>
        </Box>
    );
};

const TwoInputContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    },

    '& > *': {
        flex: 1,
        [theme.breakpoints.up('md')]: {
            width: `calc(50% - ${theme.spacing(1)})`,
            '&:first-of-type': {
                marginRight: theme.spacing(1),
            },
            '&:last-of-type': {
                marginLeft: theme.spacing(1),
            },
        },
    },
}));
