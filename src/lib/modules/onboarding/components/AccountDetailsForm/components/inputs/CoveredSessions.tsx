import { Control, Controller } from 'react-hook-form';
import { Slider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { HandleAccountOnboarding } from '@/lib/modules/onboarding/features';

interface CoveredSessionsInputProps {
    control: Control<HandleAccountOnboarding.Input>;
    max?: number;
    min?: number;
    defaultValue?: number;
    onInputBlur: () => void;
    disabled?: boolean;
}

export const CoveredSessionsInput = ({
    control,
    defaultValue = 1,
    max = 10,
    min = 1,
    onInputBlur,
    disabled,
}: CoveredSessionsInputProps) => {
    const theme = useTheme();
    return (
        <Controller
            control={control}
            name="coveredSessions"
            defaultValue={defaultValue}
            rules={{
                required: true,
            }}
            render={({ field: { onChange, onBlur, value, name } }) => (
                <Slider
                    aria-label="Number of covered sessions per billing cycle"
                    id="coveredSessions"
                    defaultValue={defaultValue}
                    style={{ margin: theme.spacing(0, 4) }}
                    onBlur={() => {
                        onBlur();
                        onInputBlur();
                    }}
                    {...{
                        disabled,
                        onChange,
                        value,
                        name,
                        min,
                        max,
                    }}
                />
            )}
        />
    );
};
