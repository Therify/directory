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
        rules={{
            required: {
                value: true,
                message: 'Bio is required',
            },
            minLength: {
                value: 50,
                message: 'Bio must be at least 50 characters long',
            },
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Textarea
                fullWidth
                required
                id="bio"
                label="Share a short bio for your profile"
                errorMessage={
                    isTouched && error?.message
                        ? `${error.message} (${
                              (value ?? '').length < 50
                                  ? `${value?.length ?? 0}/50`
                                  : ''
                          })`
                        : undefined
                }
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
