import { Control, Controller } from 'react-hook-form';
import { Slider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { HandlePracticeOnboarding } from '@/lib/features/onboarding';

interface SeatCountInputProps {
    control: Control<HandlePracticeOnboarding.Input>;
    max?: number;
    min?: number;
    defaultValue?: number;
    onInputBlur: () => void;
    disabled?: boolean;
}

export const SeatCountInput = ({
    control,
    defaultValue = 1,
    max = 10,
    min = 1,
    onInputBlur,
    disabled,
}: SeatCountInputProps) => {
    const theme = useTheme();
    return (
        <Controller
            control={control}
            name="seatCount"
            defaultValue={defaultValue}
            rules={{
                required: true,
            }}
            render={({ field: { onChange, onBlur, value, name } }) => (
                <Slider
                    aria-label="Number of seats"
                    id="numberOfSeats"
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
