import { Control, Controller } from 'react-hook-form';
import { Input } from '@/components/ui';
import { HandlePracticeOnboarding } from '@/lib/features/onboarding';

interface WebsiteInputProps {
    control: Control<HandlePracticeOnboarding.Input>;
    defaultValue?: string;
    onInputBlur: () => void;
}

export const WebsiteInput = ({
    control,
    defaultValue = '',
    onInputBlur,
}: WebsiteInputProps) => (
    <Controller
        control={control}
        name="website"
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Input
                fullWidth
                id="website"
                label="Website"
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
