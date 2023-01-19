import { Control, Controller } from 'react-hook-form';
import { Input } from '@/components/ui';
import { HandlePracticeOnboarding } from '@/lib/features/onboarding';

interface Address2InputProps {
    control: Control<HandlePracticeOnboarding.Input>;
    defaultValue?: string;
    onInputBlur: () => void;
}

export const Address2Input = ({
    control,
    defaultValue = '',
    onInputBlur,
}: Address2InputProps) => (
    <Controller
        control={control}
        name="address2"
        defaultValue={defaultValue}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Input
                fullWidth
                id="name"
                placeholder="Address 2"
                onBlur={() => {
                    onBlur();
                    onInputBlur();
                }}
                {...{
                    onChange,
                    value,
                    name,
                }}
            />
        )}
    />
);
