import { UseFormRegister, UseFormGetFieldState } from 'react-hook-form';
import { FormValidation } from '@/lib/shared/components/ui';
import { DatePicker } from '@/lib/shared/components/ui';
import { RegisterMember } from '@/lib/modules/registration/features/v3';

interface DOBInputProps {
    registerInput: UseFormRegister<RegisterMember.Input>;
    getFieldState: UseFormGetFieldState<RegisterMember.Input>;
}

export const DateOfBirthInput = ({
    registerInput,
    getFieldState,
}: DOBInputProps) => {
    const { isTouched, error } = getFieldState('user.confirmPassword');
    const { onChange, ...registerProps } = registerInput(
        'user.confirmPassword',
        {
            required: true,
            validate: {
                [FormValidation.DateValidationType.IsValid]: (date) =>
                    FormValidation.validateDateIsValid(date),
                [FormValidation.DateValidationType.MaxDate]: (date) =>
                    FormValidation.validateMaximumDate(
                        new Date(date),
                        new Date()
                    ),
                [FormValidation.DateValidationType.MinDate]: (date) =>
                    FormValidation.validateMinimumDate(
                        new Date(date),
                        new Date(1900, 0, 1)
                    ),
                [FormValidation.DateValidationType.MinAge]: (date) =>
                    FormValidation.validateMinimumAge(new Date(date), 18),
            },
        }
    );
    return (
        <DatePicker
            required
            label="Date of Birth"
            autoComplete="bday"
            // onChange={(date) => {
            //     if (date === null) return onChange(undefined);

            //     onChange(
            //         FormValidation.validateDateIsValid(date)
            //             ? date?.toISOString()
            //             : date?.toDateString()
            //     );
            // }}
            errorMessage={
                isTouched
                    ? FormValidation.getDateValidationErrorMessage(
                          error?.type as FormValidation.DateValidationType,
                          {
                              minimumAge: 18,
                          }
                      )
                    : undefined
            }
            {...{ onChange, ...registerProps }}
        />
    );
};
