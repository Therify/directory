import { Control, Controller } from 'react-hook-form';
import { Select, SelectOption } from '@/lib/shared/components/ui';
import { ProviderProfile } from '@/lib/shared/types';
import { NewClientStatus } from '@prisma/client';

interface NewClientStatusInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
}
const OPTIONS: SelectOption[] = [
    {
        value: NewClientStatus.accepting,
        displayText: 'Accepting new clients',
    },
    {
        value: NewClientStatus.waitlist,
        displayText: 'I have a waitlist',
    },
    {
        value: NewClientStatus.not_accepting,
        displayText: 'Not accepting new clients',
    },
];

export const NewClientStatusInput = ({
    control,
    disabled,
}: NewClientStatusInputProps) => (
    <Controller
        control={control}
        name="newClientStatus"
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Select
                required
                fullWidth
                id="newClientStatus"
                value={value}
                {...{
                    options: OPTIONS,
                    onChange,
                    name,
                    onBlur,
                    disabled,
                }}
            />
        )}
    />
);
