import { Control } from 'react-hook-form';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';
import { H1, H2, Caption } from '@/lib/shared/components/ui';
import {
    PracticeNameInput,
    PracticeAddressInput,
    WebsiteInput,
    PhoneNumberInput,
    PracticeEmailInput,
} from './components/inputs';
import { SafePracticeDetails } from './hooks';

export interface PracticeDetailsFormProps {
    defaultValues?: Partial<SafePracticeDetails>;
    control: Control<HandlePracticeOnboarding.Input>;
    country: HandlePracticeOnboarding.Input['country'];
    disabled?: boolean;
    onInputBlur: () => void;
}

export const PracticeDetailsForm = ({
    defaultValues,
    control,
    disabled,
    onInputBlur,
    country,
}: PracticeDetailsFormProps) => {
    const theme = useTheme();
    if (!control) throw new Error('control is required');
    return (
        <Box width="100%">
            <Header>Tell us about your practice.</Header>
            <Form onSubmit={(e) => e.preventDefault()}>
                <PracticeNameInput
                    control={control}
                    defaultValue={defaultValues?.name}
                    onInputBlur={onInputBlur}
                    disabled={disabled}
                />
                <SectionTitle>Practice address</SectionTitle>
                <Caption>
                    Address will not be publicly listed unless you choose to
                    share on your profile(s).
                </Caption>
                <PracticeAddressInput
                    control={control}
                    defaultValues={{
                        address: defaultValues?.address,
                        address2: defaultValues?.address2 ?? undefined,
                        city: defaultValues?.city,
                        state: defaultValues?.state,
                        zip: defaultValues?.zip,
                    }}
                    onInputBlur={onInputBlur}
                    disabled={disabled}
                    country={country}
                />
                <SectionTitle>Contact</SectionTitle>
                <Caption>
                    Contact will not be publicly listed unless you choose to
                    share on your profile(s).
                </Caption>
                <PracticeEmailInput
                    control={control}
                    defaultValue={defaultValues?.email}
                    onInputBlur={onInputBlur}
                    disabled={disabled}
                />
                <WebsiteInput
                    control={control}
                    defaultValue={defaultValues?.website ?? undefined}
                    onInputBlur={onInputBlur}
                    disabled={disabled}
                />
                <PhoneNumberInput
                    control={control}
                    defaultValue={defaultValues?.phone ?? undefined}
                    onInputBlur={onInputBlur}
                    disabled={disabled}
                />
            </Form>
        </Box>
    );
};

const Form = styled('form')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    '& > *': {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            '&:last-child': {
                width: '100%',
            },
        },
    },
}));

const Header = styled(H1)(({ theme }) => ({
    ...theme.typography.h3,
    width: '75%',
}));
const SectionTitle = styled(H2)(({ theme }) => ({
    ...theme.typography.h4,
    marginTop: theme.spacing(8),
}));
