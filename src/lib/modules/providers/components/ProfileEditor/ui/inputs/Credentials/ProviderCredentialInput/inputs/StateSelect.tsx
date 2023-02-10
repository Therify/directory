import { Control, Controller } from 'react-hook-form';

import { Select } from '@/lib/shared/components/ui';
import { ProviderCredential, State } from '@/lib/shared/types';
import { asSelectOptions } from '@/lib/shared/utils';

interface StateInputProps {
    control: Control<ProviderCredential.ProviderCredential>;
    defaultValue?: typeof State.ENTRIES[number];
    disabled?: boolean;
}
const options = asSelectOptions(State.ENTRIES);

export const StateInput = ({
    control,
    defaultValue = State.ENTRIES[0],
    disabled,
}: StateInputProps) => (
    <Controller
        control={control}
        name="state"
        defaultValue={defaultValue}
        rules={{
            required: true,
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Select
                id="state"
                label="Issuing State"
                placeholder="State"
                fullWidth
                value={value}
                {...{
                    onBlur,
                    options,
                    onChange,
                    name,
                    disabled,
                }}
            />
        )}
    />
);
