import { Control, Controller } from 'react-hook-form';
import { Slider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface NumberOfSeatsInputProps {
    control: Control<{
        numberOfSeats: number;
    }>;
    max?: number;
    min?: number;
    defaultValue?: number;
}

export const NumberOfSeatsInput = ({
    control,
    defaultValue = 1,
    max = 10,
    min = 1,
}: NumberOfSeatsInputProps) => {
    const theme = useTheme();
    return (
        <Controller
            control={control}
            name="numberOfSeats"
            defaultValue={defaultValue}
            rules={{
                required: true,
            }}
            render={({
                field: { onChange, onBlur, value, name },
                fieldState: { error, isTouched },
            }) => (
                <Slider
                    aria-label="Number of seats"
                    id="numberOfSeats"
                    defaultValue={defaultValue}
                    style={{ margin: theme.spacing(0, 4) }}
                    {...{
                        onChange,
                        onBlur,
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
