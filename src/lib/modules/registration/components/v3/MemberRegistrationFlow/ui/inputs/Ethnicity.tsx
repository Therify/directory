import { UseFormGetFieldState, UseFormRegister } from 'react-hook-form';
import { Select } from '@/lib/shared/components/ui';
import { RegisterMember } from '@/lib/modules/registration/features/v3';
import { TEST_IDS } from './testIds';
import { asSelectOptions } from '@/lib/shared/utils';
import { Ethnicity } from '@/lib/shared/types';

interface EthnicityInputProps {
    registerInput: UseFormRegister<RegisterMember.Input>;
    getFieldState: UseFormGetFieldState<RegisterMember.Input>;
}

export const EthnicityInput = ({
    registerInput,
    getFieldState,
}: EthnicityInputProps) => {
    const { isTouched, error } = getFieldState('profile.ethnicity');
    const { onChange, ...registerProps } = registerInput('profile.ethnicity', {
        required: 'Ethnicity is required',
    });
    return (
        <Select
            required
            id="ethnicity"
            label="Ethnicity"
            options={asSelectOptions(Ethnicity.ENTRIES)}
            sx={{
                width: '100%',
            }}
            errorMessage={isTouched ? error?.message : undefined}
            data-testid={TEST_IDS.ETHNICITY}
            onChange={(value) => {
                onChange({
                    target: { value },
                });
            }}
            {...registerProps}
        />
    );
};
