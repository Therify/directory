import { Control, Controller } from 'react-hook-form';
import { Select, SelectOption } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';
import { ProfileType } from '@prisma/client';

interface DesignationInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: ProfileType;
    disabled?: boolean;
}
const OPTIONS: SelectOption[] = [
    {
        value: ProfileType.therapist,
        displayText: 'Therapy',
    },
    {
        value: ProfileType.coach,
        displayText: 'Coaching',
    },
];

export const DesignationInput = ({
    control,
    defaultValue = ProfileType.therapist,
    disabled,
}: DesignationInputProps) => (
    <Controller
        control={control}
        name="designation"
        defaultValue={defaultValue}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Select
                required
                fullWidth
                label="What sevice will you be performing?"
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
