import { Control, Controller } from 'react-hook-form';
import { Textarea } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface BioInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: string;
    disabled?: boolean;
}

export const BioInput = ({
    control,
    defaultValue = '',
    disabled,
}: BioInputProps) => (
    <Controller
        control={control}
        name="bio"
        defaultValue={defaultValue}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Textarea
                fullWidth
                id="bio"
                label="Share a short bio for your profile"
                {...{
                    onChange,
                    onBlur,
                    value,
                    name,
                    disabled,
                }}
            />
        )}
    />
);
