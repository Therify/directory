import { Control, Controller } from 'react-hook-form';
import { Select } from '@/lib/shared/components/ui';
import { ProviderProfile, ProviderSupervisor, State } from '@/lib/shared/types';
import { asSelectOptions } from '@/lib/shared/utils';

interface StateInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    defaultValue?: (typeof State.ENTRIES)[number];
    disabled?: boolean;
    storeLocalData: (
        key:
            | keyof ProviderSupervisor.ProviderSupervisor
            | keyof ProviderSupervisor.ProviderSupervisor['supervisorLicense'],
        value: string
    ) => void;
}
const options = asSelectOptions(State.ENTRIES);

export const StateInput = ({
    control,
    defaultValue = State.ENTRIES[0],
    disabled,
    storeLocalData,
}: StateInputProps) => (
    <Controller
        control={control}
        name="supervisor.supervisorLicense.state"
        defaultValue={defaultValue}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Select
                required
                id="state"
                label="Issuing State"
                placeholder="State"
                fullWidth
                value={value}
                onChange={(state) => {
                    onChange(state);
                    storeLocalData('state', state);
                }}
                {...{
                    onBlur,
                    options,
                    name,
                    disabled,
                }}
            />
        )}
    />
);
