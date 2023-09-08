import { UseFormGetFieldState, UseFormRegister } from 'react-hook-form';
import { Select } from '@/lib/shared/components/ui';
import { RegisterMember } from '@/lib/modules/registration/features/v3';
import { TEST_IDS } from './testIds';
import { asSelectOptions } from '@/lib/shared/utils';
import { Gender } from '@/lib/shared/types';

interface GenderInputProps {
    registerInput: UseFormRegister<RegisterMember.Input>;
    getFieldState: UseFormGetFieldState<RegisterMember.Input>;
}

export const GenderInput = ({
    registerInput,
    getFieldState,
}: GenderInputProps) => {
    const { isTouched, error } = getFieldState('profile.gender');
    const { onChange, ...registerProps } = registerInput('profile.gender', {
        required: 'Gender is required',
    });
    return (
        <Select
            required
            id="gender"
            label="Gender"
            options={asSelectOptions(Gender.ENTRIES)}
            sx={{
                width: '100%',
            }}
            errorMessage={isTouched ? error?.message : undefined}
            data-testid={TEST_IDS.GENDER}
            onChange={(value) => {
                onChange({
                    target: { value },
                });
            }}
            {...registerProps}
        />
    );
};
