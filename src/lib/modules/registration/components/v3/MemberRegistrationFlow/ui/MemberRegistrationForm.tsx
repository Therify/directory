import {
    Control,
    UseFormRegister,
    UseFormGetFieldState,
} from 'react-hook-form';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RegisterMember } from '@/lib/modules/registration/features/v3';
import { FormRenderer, H1 } from '@/lib/shared/components/ui';
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
import { memberRegistrationFormConfig } from '../registrationFormConfig';

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

export const MemberRegistrationForm = () => {
    return (
        <Box width="100%">
            <FormRenderer
                validationSchema={RegisterMember.inputSchema}
                config={memberRegistrationFormConfig}
                onSubmit={console.log}
                defaultValues={{
                    user: {
                        role: ROLES.MEMBER,
                    },
                }}
            />
        </Box>
    );
};
