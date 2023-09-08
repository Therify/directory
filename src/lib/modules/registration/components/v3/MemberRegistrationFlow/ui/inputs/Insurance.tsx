import { UseFormGetFieldState, UseFormRegister } from 'react-hook-form';
import { FormValidation, Select } from '@/lib/shared/components/ui';
import { RegisterMember } from '@/lib/modules/registration/features/v3';
import { TEST_IDS } from './testIds';
import { asSelectOptions } from '@/lib/shared/utils';
import { InsuranceProvider } from '@/lib/shared/types';

interface InsuranceInputProps {
    registerInput: UseFormRegister<RegisterMember.Input>;
    getFieldState: UseFormGetFieldState<RegisterMember.Input>;
}

export const InsuranceInput = ({
    registerInput,
    getFieldState,
}: InsuranceInputProps) => {
    const { isTouched, error } = getFieldState('profile.insurance');
    const { onChange, ...registerProps } = registerInput('profile.insurance', {
        required: true,
    });
    return (
        <Select
            required
            id="insurance"
            label="Insurance"
            options={asSelectOptions([...InsuranceProvider.ENTRIES])}
            sx={{
                width: '100%',
            }}
            errorMessage={
                isTouched
                    ? FormValidation.getInsuranceValidationErrorMessage(
                          error?.type as FormValidation.InsuranceValidationType,
                          'Insurance'
                      )
                    : undefined
            }
            autoComplete="insurance"
            data-testid={TEST_IDS.FIRST_NAME}
            onChange={(insurance) => {
                onChange({
                    target: { value: insurance },
                });
            }}
            {...registerProps}
        />
    );
};
