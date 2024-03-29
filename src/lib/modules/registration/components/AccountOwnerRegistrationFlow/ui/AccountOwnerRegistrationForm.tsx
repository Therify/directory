import { Control } from 'react-hook-form';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RegisterAccountOwner } from '@/lib/modules/registration/features';
import { Badge, H1, Paragraph } from '@/lib/shared/components/ui';

import {
    DateOfBirthInput,
    EmailAddressInput,
    GivenNameInput,
    PasswordConfirmationInput,
    PasswordInput,
    SurnameInput,
    StateInput,
    TermsAndConditionsInput,
    TEST_IDS,
    ConcernsInput,
    GoalsInput,
    CountryInput,
} from './inputs';
import { ROLES } from '@/lib/shared/types/roles';
import { InsuranceInput } from './inputs/Insurance';
import { Country } from '@/lib/shared/types';

export interface AccountOwnerRegistrationFormProps {
    defaultValues?: Partial<
        Omit<
            RegisterAccountOwner.Input,
            'password' | 'confirmPassword' | 'hasAcceptedTermsAndConditions'
        >
    >;
    password: string;
    control?: Control<RegisterAccountOwner.Input>;
    isEmailUnique?: boolean;
    isEmailDisabled?: boolean;
    emailHelperText?: string;
    role: typeof ROLES.ACCOUNT_OWNER;
    country: Country.Country;
}

export const AccountOwnerRegistrationForm = ({
    defaultValues,
    password,
    control,
    isEmailUnique,
    isEmailDisabled,
    emailHelperText,
    country,
}: AccountOwnerRegistrationFormProps) => {
    if (!control) throw new Error('control is required');
    return (
        <Box width="100%">
            <Header>
                We&#39;re happy you&#39;re here!
                <br />
                To start, let&#39;s get you registered.
            </Header>
            <Form
                data-testid={TEST_IDS.FORM}
                onSubmit={(e) => e.preventDefault()}
            >
                <GivenNameInput
                    control={control}
                    defaultValue={defaultValues?.givenName}
                />
                <SurnameInput
                    control={control}
                    defaultValue={defaultValues?.surname}
                />
                <EmailAddressInput
                    control={control}
                    defaultValue={defaultValues?.emailAddress}
                    isEmailUnique={isEmailUnique}
                    disabled={isEmailDisabled}
                    helperText={emailHelperText}
                />
                <DateOfBirthInput
                    control={control}
                    defaultValue={defaultValues?.dateOfBirth}
                />
                <PasswordInput control={control} />
                <PasswordConfirmationInput
                    control={control}
                    password={password}
                />
                <LocationWrapper>
                    <StateInput control={control} country={country} />
                    <CountryInput control={control} />
                </LocationWrapper>
                <InsuranceInput control={control} />
                <GoalsInput control={control} />
                <ConcernsInput control={control} />
                <TermsAndConditionsInput control={control} />
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
            width: `calc(50% - ${theme.spacing(4)})`,
            '&:nth-of-type(odd)': {
                marginRight: theme.spacing(2),
            },
            '&:nth-of-type(even)': {
                marginLeft: theme.spacing(2),
            },
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

const LocationWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        '& > *:nth-of-type(1)': {
            marginRight: theme.spacing(4),
        },
    },
    '& > *': {
        flex: 1,
    },
}));
