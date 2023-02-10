import { Control, Controller } from 'react-hook-form';
import { Textarea } from '@/lib/shared/components/ui';
import { ProviderProfile } from '@/lib/shared/types';

interface BioInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
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
