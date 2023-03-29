import {
    Box,
    FormControl,
    Grid,
    InputLabelProps,
    styled,
    useTheme,
} from '@mui/material';
import { useCallback, useState } from 'react';
import {
    useController,
    UseControllerProps,
    type FieldError,
    type FieldValues,
} from 'react-hook-form';
import type { Merge, UseControllerReturn } from 'react-hook-form/dist/types';
import { Caption, CAPTION_SIZE } from '../../../Typography';
import { InputLabel } from '../../Input';

type SelectGridBaseProps<TForm extends FieldValues> = {
    labelProps?: InputLabelProps;
    label?: string;
    error?: Merge<FieldError, (FieldError | undefined)[]>;
    options: readonly string[];
    controllerProps: UseControllerProps<TForm>;
    required?: boolean;
};

export const ControlledSelectGrid = <TForm extends FieldValues>({
    controllerProps,
    error,
    label,
    labelProps = {},
    required,
    options,
}: SelectGridBaseProps<TForm>) => {
    const theme = useTheme();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const { field } = useController(controllerProps);
    const handleItemSelected = useCallback(
        (option: string) => {
            if (selectedItems.includes(option)) {
                setSelectedItems(
                    selectedItems.filter((item) => item !== option)
                );
                field.onChange(selectedItems.filter((item) => item !== option));
            } else {
                setSelectedItems([...selectedItems, option]);
                field.onChange([...selectedItems, option]);
            }
        },
        [selectedItems, field]
    );
    const isItemSelected = useCallback(
        (option: string) => {
            return selectedItems.includes(option);
        },
        [selectedItems]
    );
    return (
        <FormControl>
            {label ?? (
                <InputLabel required={required} {...labelProps}>
                    {label}
                </InputLabel>
            )}
            <SelectGrid>
                {options.map((option) => (
                    <SelectGridItem
                        selected={isItemSelected(option)}
                        key={option}
                        onClick={() => handleItemSelected(option)}
                    >
                        {option}
                    </SelectGridItem>
                ))}
            </SelectGrid>
            {error && (
                <Caption
                    size={CAPTION_SIZE.SMALL}
                    style={{
                        color: theme.palette.error.main,
                    }}
                >
                    {error.message}
                </Caption>
            )}
        </FormControl>
    );
};

const SelectGrid = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gridGap: theme.spacing(4),
    },
}));

const SelectGridItem = styled(Box)<{ selected: boolean }>(
    ({ theme, selected }) => ({
        border: `2px solid ${theme.palette.secondary.dark}`,
        color: theme.palette.secondary.dark,
        padding: `${theme.spacing(4)} ${theme.spacing(8)}`,
        height: 77,
        maxHeight: 77,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
            background: theme.palette.secondary.light,
            cursor: 'pointer',
        },
        ...(selected && {
            background: theme.palette.secondary.dark,
            color: theme.palette.secondary.contrastText,
        }),
    })
);
