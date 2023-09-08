import { UseFormGetFieldState, UseFormRegister } from 'react-hook-form';
import { Input, FormValidation } from '@/lib/shared/components/ui';
import { RegisterMember } from '@/lib/modules/registration/features/v3';
import { TEST_IDS } from './testIds';

interface GivenNameInputProps {
    registerInput: UseFormRegister<RegisterMember.Input>;
    getFieldState: UseFormGetFieldState<RegisterMember.Input>;
}

export const GivenNameInput = ({
    registerInput,
    getFieldState,
}: GivenNameInputProps) => {
    const { isTouched, error } = getFieldState('user.givenName');
    return (
        <Input
            required
            id="givenName"
            label="First Name"
            errorMessage={
                isTouched
                    ? FormValidation.getNameValidationErrorMessage(
                          error?.type as FormValidation.NameValidationType,
                          'First Name'
                      )
                    : undefined
            }
            autoComplete="first-name"
            data-testid={TEST_IDS.FIRST_NAME}
            {...registerInput('user.givenName', {
                required: true,
            })}
        />
    );
};
