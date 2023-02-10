import { Control, Controller } from 'react-hook-form';
import { Textarea } from '@/lib/shared/components/ui';
import { ProviderProfile } from '@/lib/shared/types';

interface PracticeNotesInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
}

export const PracticeNotesInput = ({
    control,
    disabled,
}: PracticeNotesInputProps) => (
    <Controller
        control={control}
        name="practiceNotes"
        defaultValue=""
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Textarea
                fullWidth
                id="practiceNotes"
                label="Tell us about your approach with your clients"
                {...{
                    onChange,
                    onBlur,
                    value,
                    name,
                    disabled,
                }}
            />
        )}
    />
);
