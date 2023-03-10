import { Badge } from '@/lib/shared/components/ui';
import { FormSectionTitle } from '@/lib/shared/components/ui/FormElements';
import { ProviderProfile } from '@/lib/shared/types';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Control } from 'react-hook-form';
import { ContactEmailInput } from './ContactEmail';
import { EthnicitiesInput } from './Ethnicities';
import { GenderInput } from './Gender';
import { GivenNameInput } from './GivenName';
import { IsMultiracialToggle } from './IsMultiracial';
import { PronounsInput } from './Pronouns';
import { SurnameInput } from './Surname';

interface IdentitySectionProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
}
const NEW_FEATURE_EXPIRATION = new Date('2023-03-17').getTime();
export const IdentitySection = ({
    control,
    disabled,
}: IdentitySectionProps) => {
    const showNewFeatureBadge = NEW_FEATURE_EXPIRATION > Date.now();
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
            <Box>
                <EthnicitiesInput control={control} disabled={disabled} />
            </Box>
            <Box>
                <IsMultiracialToggle control={control} disabled={disabled} />
                {showNewFeatureBadge && (
                    <Badge
                        color="success"
                        size="small"
                        style={{ marginLeft: 16 }}
                    >
                        New!
                    </Badge>
                )}
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
