import { Control, Controller } from 'react-hook-form';
import { Textarea } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface IdealClientDescriptionInputProps {
    control: Control<ProviderProfile>;
    disabled?: boolean;
}

export const IdealClientDescriptionInput = ({
    control,
    disabled,
}: IdealClientDescriptionInputProps) => (
    <Controller
        control={control}
        name="idealClientDescription"
        defaultValue=""
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Textarea
                fullWidth
                id="idealClientDescription"
                label="Describe your ideal client"
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
