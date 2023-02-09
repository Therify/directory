import { Control, Controller } from 'react-hook-form';
import { InsuranceProvider } from '@/lib/types';
import { Autocomplete, TextField } from '@mui/material';
import { ProviderProfile } from '@/lib/types/providerProfile';

type AcceptedInsurance = typeof InsuranceProvider.ENTRIES[number];

interface AcceptedInsurancesInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: string[];
    disabled?: boolean;
}

export const AcceptedInsurancesInput = ({
    control,
    defaultValue,
    disabled,
}: AcceptedInsurancesInputProps) => (
    <Controller
        control={control}
        name="acceptedInsurances"
        defaultValue={defaultValue as AcceptedInsurance[]}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Autocomplete
                multiple
                options={InsuranceProvider.ENTRIES}
                {...{
                    onChange,
                    onBlur,
                    name,
                    disabled,
                    value,
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Accepted Insurances" />
                )}
            />
        )}
    />
);
