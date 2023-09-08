import { UseFormGetFieldState, UseFormRegister } from 'react-hook-form';
import { FormValidation, Select } from '@/lib/shared/components/ui';
import { TEST_IDS } from './testIds';
import { UNITED_STATES } from '@/lib/shared/types';
import { asSelectOptions } from '@/lib/shared/utils';
import { RegisterMember } from '@/lib/modules/registration/features/v3';

interface StateInputProps {
    registerInput: UseFormRegister<RegisterMember.Input>;
    getFieldState: UseFormGetFieldState<RegisterMember.Input>;
}

export const StateInput = ({
    registerInput,
    getFieldState,
}: StateInputProps) => {
    const { isTouched, error } = getFieldState('profile.state');
    const { onChange, ...registerProps } = registerInput('profile.state', {
        required: true,
    });
    return (
        <Select
            id="state"
            data-testid={TEST_IDS.FIRST_NAME}
            options={asSelectOptions(UNITED_STATES.STATE.ENTRIES)}
            required
            label={'State'}
            placeholder={'State'}
            sx={{
                width: '100%',
            }}
            errorMessage={
                isTouched
                    ? FormValidation.getStateValidationErrorMessage(
                          error?.type as FormValidation.StateValidationType,
                          'State'
                      )
                    : undefined
            }
            autoComplete="state"
            onChange={(state) => {
                onChange({
                    target: { value: state },
                });
            }}
            {...registerProps}
        />
    );
};
