import { Control, Controller } from 'react-hook-form';
import { Input } from '@/components/ui';
import { ProviderCredential } from '@/lib/types';

interface InputProps {
    control: Control<ProviderCredential.ProviderCredential>;
    defaultValue?: string;
    disabled?: boolean;
}

export const LicenseTypeInput = ({
    control,
    defaultValue = '',
    disabled,
}: InputProps) => (
    <Controller
        control={control}
        name="type"
        defaultValue={defaultValue}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Input
                label="License Type"
                fullWidth
                id="licenseType"
                placeholder="ex. L.C.S.W., L.M.F.T., etc."
                {...{
                    disabled,
                    onChange,
                    onBlur,
                    value,
                    name,
                }}
            />
        )}
    />
);
