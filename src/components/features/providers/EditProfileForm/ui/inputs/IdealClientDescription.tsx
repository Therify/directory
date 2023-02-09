import { Control, Controller } from 'react-hook-form';
import { Textarea } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface IdealClientDescriptionInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: string;
}

export const IdealClientDescriptionInput = ({
    control,
    defaultValue = '',
}: IdealClientDescriptionInputProps) => (
    <Controller
        control={control}
        name="idealClientDescription"
        defaultValue={defaultValue}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Textarea
                required
                fullWidth
                id="idealClientDescription"
                label="Ideal client description"
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
