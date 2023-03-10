import { ReactNode } from 'react';
import { Control } from 'react-hook-form';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RegisterProvider } from '@/lib/modules/registration/features';
import { H1 } from '@/lib/shared/components/ui';

import {
    DateOfBirthInput,
    EmailAddressInput,
    GivenNameInput,
    PasswordConfirmationInput,
    PasswordInput,
    SurnameInput,
    TermsAndConditionsInput,
    TEST_IDS,
} from './inputs';
import { ROLES } from '@/lib/shared/types/roles';

export interface ProviderRegistrationFormProps {
    formTitle?: ReactNode;
    defaultValues?: Partial<
        Omit<
            RegisterProvider.Input,
            'password' | 'confirmPassword' | 'hasAcceptedTermsAndConditions'
        >
    >;
    password: string;
    control?: Control<RegisterProvider.Input>;
    isEmailUnique?: boolean;
    isEmailDisabled?: boolean;
    emailHelperText?: string;
    isEmailReadOnly?: boolean;
    role: typeof ROLES.PROVIDER_THERAPIST | typeof ROLES.PROVIDER_COACH;
}

export const ProviderRegistrationForm = ({
    formTitle,
    defaultValues,
    password,
    control,
    isEmailUnique,
    isEmailDisabled,
    emailHelperText,
    isEmailReadOnly,
}: ProviderRegistrationFormProps) => {
    if (!control) throw new Error('control is required');
    return (
        <Box width="100%">
            {formTitle ?? (
                <Header>
                    Grow your practice &<br /> make an impact
                </Header>
            )}
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
                    isEmailReadOnly={isEmailReadOnly}
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
