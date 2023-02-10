import {
    Box,
    FormControl,
    InputLabel,
    MenuItem as MuiMenuItem,
    Select as MuiSelect,
    SelectChangeEvent,
    SelectProps as MuiSelectProps,
} from '@mui/material';
import { styled, Theme, useTheme } from '@mui/material/styles';
import { Caption, CAPTION_SIZE } from '../../Typography';

export interface SelectOption {
    id?: string;
    value: string;
    displayText: string;
    disabled?: boolean;
}

interface BaseSelectProps {
    id: string;
    options: SelectOption[];
    onChange?: (value: string) => void;
    value?: string;
    helperText?: string;
    errorMessage?: string;
}

type SelectProps = BaseSelectProps &
    Omit<MuiSelectProps, 'onChange' | 'value' | 'defaultValue'>;

export const TEST_IDS = {
    SELECT: 'select',
    LABEL: 'label',
    HELPER_TEXT: 'helper-text',
    SELECT_MENU_ITEM: 'select-menu-item',
    SELECT_MENU_ITEM_PLACEHOLDER: 'select-menu-item-placeholder',
    PLACEHOLDER: 'placeholder',
};

export const Select = ({
    id,
    onChange,
    errorMessage,
    helperText,
    value = '',
    options,
    MenuProps,
    label,
    required,
    placeholder,
    native,
    fullWidth,
    ...selectProps
}: SelectProps) => {
    const theme = useTheme();
    const errorColor = errorMessage ? theme.palette.error.main : undefined;
    const OptionComponent = native ? 'option' : MuiMenuItem;
    const placeholderOption = {
        id: 'placeholder',
        value: '',
        displayText: placeholder || 'Select an option',
        disabled: true,
    };

    const handleChange = (event: SelectChangeEvent<unknown>) => {
        onChange?.(event.target.value as string);
    };

    return (
        <FormControl fullWidth={fullWidth} error={Boolean(errorMessage)}>
            {label && (
                <InputLabel
                    data-testid={TEST_IDS.LABEL}
                    id={`${id}-label`}
                    shrink
                    style={{
                        fontSize: 14,
                        position: 'relative',
                        color: theme.palette.grey[600],
                        transform: 'none',
                    }}
                >
                    {label}{' '}
                    {required && (
                        <span style={{ color: theme.palette.error.main }}>
                            *
                        </span>
                    )}
                </InputLabel>
            )}
            <Box position="relative" marginTop={label ? theme.spacing(4) : 0}>
                <StyledSelect
                    className={value ? '' : 'unselected'}
                    native={native}
                    data-testid={TEST_IDS.SELECT}
                    isError={Boolean(errorMessage)}
                    labelId={`${id}-label`}
                    id={id}
                    color="info"
                    fullWidth={fullWidth}
                    value={value}
                    label={placeholder}
                    placeholder={placeholder}
                    onChange={handleChange}
                    inputProps={{
                        placeholder,
                    }}
                    MenuProps={{
                        ...MenuProps,
                        sx: {
                            ...getMenuStyle(theme),
                            ...MenuProps?.sx,
                        },
                    }}
                    {...selectProps}
                >
                    {getMenuItems(OptionComponent, [
                        ...(placeholder ? [placeholderOption] : []),
                        ...options,
                    ])}
                </StyledSelect>
                {!native && placeholder && value === '' && (
                    <SelectPlaceholder data-testid={TEST_IDS.PLACEHOLDER}>
                        {placeholder}
                    </SelectPlaceholder>
                )}
            </Box>
            {(errorMessage || helperText) && (
                <Caption
                    data-testid={TEST_IDS.HELPER_TEXT}
                    size={CAPTION_SIZE.SMALL}
                    style={{
                        marginTop: theme.spacing(3),
                        color: errorColor ?? theme.palette.grey[500],
                    }}
                >
                    {errorMessage ?? helperText}
                </Caption>
            )}
        </FormControl>
    );
};

const getMenuItems = (
    OptionComponent: 'option' | typeof MuiMenuItem,
    options: SelectOption[]
) =>
    options.map(({ id, value, displayText, disabled }) => (
        <OptionComponent
            data-testid={`${TEST_IDS.SELECT_MENU_ITEM}-${id ?? value}`}
            key={id ?? value}
            disabled={disabled}
            value={value}
        >
            {displayText}
        </OptionComponent>
    ));

const getMenuStyle = (theme: Theme) => {
    return {
        border: `1px solid`,
        marginTop: theme.spacing(3),
        '& ul.MuiList-root': {
            padding: theme.spacing(3, 4),
            '& .MuiMenuItem-root': {
                borderRadius: 1, // sx: results in base borderRadius from theme (4px)
                marginTop: theme.spacing(1.5),
                '&:first-of-type': {
                    marginTop: 0,
                },
                '&.Mui-selected, &.Mui-selected:focus': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    '&.Mui-disabled': {
                        backgroundColor: 'transparent',
                        color: theme.palette.grey[400],
                        opacity: 1,
                    },
                },
                '&:focus, &:hover': {
                    backgroundColor: theme.palette.grey[50],
                },
            },
        },
    };
};

const StyledSelect = styled(MuiSelect, {
    shouldForwardProp: (prop) => 'isLabel' !== prop && 'isError' !== prop,
})<{
    isError: boolean;
}>(({ theme, isError }) => {
    const errorColor = isError ? theme.palette.error.main : undefined;
    return {
        borderRadius: theme.shape.borderRadius,
        border: `1px solid`,
        borderColor: errorColor ?? theme.palette.grey[50],
        lineHeight: 1,
        '& .MuiSelect-select': {
            padding: theme.spacing(4, 8, 4, 3),
            minHeight: '1em !important',
        },
        '&.unselected, &.unselected select': {
            color: theme.palette.grey[400],
        },
        '& select': {
            padding: theme.spacing(4, 8, 4, 3),
            height: '1em',
            minHeight: '1em !important',
        },
        '&.Mui-focused': {
            border: '1px solid',
            borderColor: `${theme.palette.grey[200]} !important`,
        },
        '&:hover': {
            border: `1px solid ${theme.palette.grey[100]}`,
        },
        'label + &': {
            marginTop: theme.spacing(4),
        },
        '& fieldset': {
            display: 'none',
        },
    };
});

const SelectPlaceholder = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    fontSize: theme.typography.body1.fontSize,
    padding: theme.spacing(4, 8, 4, 3),
    color: theme.palette.grey[400],
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}));
