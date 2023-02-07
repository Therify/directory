import { Control, Controller } from 'react-hook-form';
import { Textarea } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface BioInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: string;
}

export const BioInput = ({ control, defaultValue = '' }: BioInputProps) => (
    <Controller
        control={control}
        name="bio"
        defaultValue={defaultValue}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Textarea
                required
                fullWidth
                id="bio"
                label="About"
                {...{
                    onChange,
                    onBlur,
                    value,
                    name,
                }}
            />
        )}
    />
);
