import { FormSectionTitle } from '@/components/ui/FormElements';
import { ProviderProfile } from '@/lib/types/providerProfile';
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
    control: Control<ProviderProfile>;
    disabled?: boolean;
    defaultValues: {
        givenName?: string;
        surname?: string;
        gender?: string;
        pronouns?: string;
        ethnicities?: string[];
        contactEmail?: string;
    };
}
export const IdentitySection = ({
    control,
    defaultValues,
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
                <ContactEmailInput
                    control={control}
                    disabled={disabled}
                    defaultValue={defaultValues.contactEmail}
                />
            </Box>
            <TwoInputContainer>
                <GivenNameInput
                    control={control}
                    defaultValue={defaultValues.givenName}
                    disabled={disabled}
                />
                <SurnameInput
                    control={control}
                    defaultValue={defaultValues.surname}
                    disabled={disabled}
                />
            </TwoInputContainer>
            <TwoInputContainer>
                <GenderInput
                    control={control}
                    defaultValue={defaultValues.gender}
                    disabled={disabled}
                />
                <PronounsInput
                    control={control}
                    defaultValue={defaultValues.pronouns}
                    disabled={disabled}
                />
            </TwoInputContainer>
            <Box marginTop={8}>
                <EthnicitiesInput
                    control={control}
                    defaultValue={defaultValues.ethnicities}
                    disabled={disabled}
                />
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
