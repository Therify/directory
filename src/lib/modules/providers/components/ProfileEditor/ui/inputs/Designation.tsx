import { Control, Controller } from 'react-hook-form';
import { Select, SelectOption } from '@/lib/shared/components/ui';
import { ProviderProfile } from '@/lib/shared/types';
import { ProfileType } from '@prisma/client';

interface DesignationInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
}
const OPTIONS: SelectOption[] = [
    {
        value: ProfileType.therapist,
        displayText: 'Therapist',
    },
    {
        value: ProfileType.coach,
        displayText: 'Mental Health Coach',
    },
];

export const DesignationInput = ({
    control,
    disabled,
}: DesignationInputProps) => (
    <Controller
        control={control}
        name="designation"
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Select
                required
                fullWidth
                id="designation"
                value={value}
                {...{
                    options: OPTIONS,
                    onChange,
                    name,
                    onBlur,
                    disabled,
                }}
            />
        )}
    />
);
