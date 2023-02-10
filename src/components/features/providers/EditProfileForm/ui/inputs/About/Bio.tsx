import { Control, Controller } from 'react-hook-form';
import { Textarea } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface BioInputProps {
    control: Control<ProviderProfile>;
    disabled?: boolean;
}

export const BioInput = ({ control, disabled }: BioInputProps) => (
    <Controller
        control={control}
        name="bio"
        defaultValue=""
        render={({ field: { onChange, onBlur, value, name } }) => (
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
