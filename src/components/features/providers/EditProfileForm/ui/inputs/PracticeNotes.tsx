import { Control, Controller } from 'react-hook-form';
import { Textarea } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface PracticeNotesInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: string;
}

export const PracticeNotesInput = ({
    control,
    defaultValue = '',
}: PracticeNotesInputProps) => (
    <Controller
        control={control}
        name="practiceNotes"
        defaultValue={defaultValue}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Textarea
                required
                fullWidth
                id="practiceNotes"
                label="Tell us about your approach with your clients"
                {...{
                    onChange,
                    onBlur,
                    value,
                    name,
                }}
            />
        )}
    />
);
