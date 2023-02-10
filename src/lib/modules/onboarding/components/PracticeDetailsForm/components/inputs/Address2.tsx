import { Control, Controller } from 'react-hook-form';
import { Input } from '@/lib/shared/components/ui';
import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';

interface Address2InputProps {
    control: Control<HandlePracticeOnboarding.Input>;
    defaultValue?: string;
    onInputBlur: () => void;
    disabled?: boolean;
}

export const Address2Input = ({
    control,
    defaultValue = '',
    onInputBlur,
    disabled,
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
                    disabled,
                }}
            />
        )}
    />
);
