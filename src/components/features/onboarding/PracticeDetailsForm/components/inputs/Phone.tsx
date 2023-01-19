import { Control, Controller } from 'react-hook-form';
import { Input } from '@/components/ui';
import { HandlePracticeOnboarding } from '@/lib/features/onboarding';

interface PhoneNumberInputProps {
    control: Control<HandlePracticeOnboarding.Input>;
    defaultValue?: string;
    onInputBlur: () => void;
}

export const PhoneNumberInput = ({
    control,
    defaultValue = '',
    onInputBlur,
}: PhoneNumberInputProps) => (
    <Controller
        control={control}
        name="phone"
        defaultValue={defaultValue}
        // TODO: Add validation for phone number
        // rules={{
        //     nineDigits: (value: string) => {
        //         return value.length === 9;
        //     },
        // }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Input
                fullWidth
                type="tel"
                id="phone"
                label="phone"
                errorMessage={
                    isTouched && error
                        ? 'Phone Number must be 9 digits.'
                        : undefined
                }
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
