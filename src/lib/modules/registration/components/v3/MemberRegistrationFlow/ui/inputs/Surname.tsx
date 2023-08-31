import {
    Control,
    Controller,
    UseFormGetFieldState,
    UseFormRegister,
} from 'react-hook-form';
import { Input, FormValidation } from '@/lib/shared/components/ui';

import { TEST_IDS } from './testIds';
import { RegisterMember } from '@/lib/modules/registration/features/v3';

interface SurnameInputProps {
    registerInput: UseFormRegister<RegisterMember.Input>;
    getFieldState: UseFormGetFieldState<RegisterMember.Input>;
}

export const SurnameInput = ({
    registerInput,
    getFieldState,
}: SurnameInputProps) => {
    const { isTouched, error } = getFieldState('user.surname');
    return (
        <Input
            required
            id="surname"
            label="Last Name"
            errorMessage={
                isTouched
                    ? FormValidation.getNameValidationErrorMessage(
                          error?.type as FormValidation.NameValidationType,
                          'Last Name'
                      )
                    : undefined
            }
            autoComplete="last-name"
            data-testid={TEST_IDS.LAST_NAME}
            {...registerInput('user.surname', {
                required: true,
            })}
        />
    );
};
