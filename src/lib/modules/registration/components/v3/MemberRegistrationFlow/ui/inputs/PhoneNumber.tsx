import { UseFormGetFieldState, UseFormRegister } from 'react-hook-form';
import { Input, FormValidation } from '@/lib/shared/components/ui';
import { RegisterMember } from '@/lib/modules/registration/features/v3';
import { TEST_IDS } from './testIds';

interface PhoneNumberInputProps {
    registerInput: UseFormRegister<RegisterMember.Input>;
    getFieldState: UseFormGetFieldState<RegisterMember.Input>;
}

export const PhoneNumberInput = ({
    registerInput,
    getFieldState,
}: PhoneNumberInputProps) => {
    const { isTouched, error } = getFieldState('user.phoneNumber');
    return (
        <Input
            required
            id="phoneNumber"
            label="Phone Number"
            errorMessage={
                isTouched
                    ? // TODO: Add validation for phone number
                      FormValidation.getNameValidationErrorMessage(
                          error?.type as FormValidation.NameValidationType,
                          'Phone Number'
                      )
                    : undefined
            }
            autoComplete="phone"
            data-testid={TEST_IDS.PHONE_NUMBER}
            {...registerInput('user.phoneNumber', {
                required: true,
            })}
        />
    );
};
