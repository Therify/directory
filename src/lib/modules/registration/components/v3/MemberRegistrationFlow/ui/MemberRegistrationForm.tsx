import {
    Control,
    UseFormRegister,
    UseFormGetFieldState,
} from 'react-hook-form';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RegisterMember } from '@/lib/modules/registration/features/v3';
import { Badge, H1, Input, Paragraph } from '@/lib/shared/components/ui';
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
    PhoneNumberInput,
    GenderInput,
    EthnicityInput,
} from './inputs';
import { ROLES } from '@/lib/shared/types/roles';
import { InsuranceInput } from './inputs/Insurance';
import { Account } from '@prisma/client';
import { Country } from '@/lib/shared/types';

export interface MemberRegistrationFormProps {
    registerInput: UseFormRegister<RegisterMember.Input>;
    getFieldState: UseFormGetFieldState<RegisterMember.Input>;
    defaultValues?: Partial<
        Omit<
            RegisterMember.Input,
            'password' | 'confirmPassword' | 'hasAcceptedTermsAndConditions'
        >
    >;
    password: string;
    control?: Control<RegisterMember.Input>;
    isEmailUnique?: boolean;
    isEmailDisabled?: boolean;
    emailHelperText?: string;
    role: typeof ROLES.MEMBER;
    account?: Account;
    country: Country.Country;
    showInsurances?: boolean;
}

export const MemberRegistrationForm = ({
    defaultValues,
    password,
    control,
    isEmailUnique,
    isEmailDisabled,
    emailHelperText,
    account,
    country,
    showInsurances = true,
    registerInput,
    getFieldState,
}: MemberRegistrationFormProps) => {
    if (!control) throw new Error('control is required');
    return (
        <Box width="100%">
            <Header>
                We&#39;re happy you&#39;re here!
                <br />
                To start, let&#39;s get you registered.
            </Header>
            {account && (
                <Paragraph>
                    You are joining <Badge>{account.name}</Badge>
                </Paragraph>
            )}
            <Form
                data-testid={TEST_IDS.FORM}
                onSubmit={(e) => e.preventDefault()}
            >
                <Paragraph bold>Account Details</Paragraph>
                <section>
                    <GivenNameInput
                        registerInput={registerInput}
                        getFieldState={getFieldState}
                    />
                    <SurnameInput
                        registerInput={registerInput}
                        getFieldState={getFieldState}
                    />
                    <EmailAddressInput
                        registerInput={registerInput}
                        getFieldState={getFieldState}
                        isEmailUnique={isEmailUnique}
                        disabled={isEmailDisabled}
                        helperText={emailHelperText}
                    />
                    <PhoneNumberInput
                        registerInput={registerInput}
                        getFieldState={getFieldState}
                    />
                    <PasswordInput
                        registerInput={registerInput}
                        getFieldState={getFieldState}
                    />
                    <PasswordConfirmationInput
                        registerInput={registerInput}
                        getFieldState={getFieldState}
                        password={password}
                    />
                    {/* <DateOfBirthInput
                        registerInput={registerInput}
                        getFieldState={getFieldState}
                    /> */}
                </section>
                <Paragraph bold>Personal Details</Paragraph>
                <section>
                    <StateInput
                        registerInput={registerInput}
                        getFieldState={getFieldState}
                    />
                    {showInsurances && (
                        <InsuranceInput
                            registerInput={registerInput}
                            getFieldState={getFieldState}
                        />
                    )}
                    <GenderInput
                        registerInput={registerInput}
                        getFieldState={getFieldState}
                    />
                    <EthnicityInput
                        registerInput={registerInput}
                        getFieldState={getFieldState}
                    />
                </section>
                {/* 
                <LocationWrapper>
                    <CountryInput control={control} />
                </LocationWrapper>
                <GoalsInput control={control} />
                <ConcernsInput control={control} />
                <TermsAndConditionsInput control={control} /> */}
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
    '& section': {
        width: '100%',
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
                // '&:last-child': {
                //     width: '100%',
                // },
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
