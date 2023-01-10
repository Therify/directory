import {
    Checkbox,
    FormControlLabel,
    FormControlLabelProps as MuiFormControlLabelProps,
    Radio,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Switch } from './Switch';
import { MuiColor } from './types';

export const TEST_IDS = {
    CONTROL_ELEMENT: 'control-element',
};

export const enum ToggleType {
    Checkbox = 'checkbox',
    Radio = 'radio',
    Switch = 'switch',
}

export interface ToggleProps {
    displayText?: React.ReactNode;
    uncheckedColor?: MuiColor;
    checkedColor?: MuiColor;
    type?: ToggleType;
    switchSize?: { trackHeight?: number; borderSize?: number };
}

const getControlElement = (type: ToggleType) => {
    switch (type) {
        case ToggleType.Radio:
            return Radio;

        case ToggleType.Switch:
            return Switch;

        case ToggleType.Checkbox:
        default:
            return Checkbox;
    }
};

export const Toggle = ({
    type = ToggleType.Checkbox,
    displayText,
    uncheckedColor,
    checkedColor,
    switchSize,
    ...formControlLabelProps
}: ToggleProps & Omit<MuiFormControlLabelProps, 'label' | 'control'>) => {
    const ControlEl = getControlElement(type);
    return (
        <StyledFormControlLabel
            uncheckedColor={uncheckedColor}
            checkedColor={checkedColor}
            control={
                <ControlEl
                    data-testid={TEST_IDS.CONTROL_ELEMENT}
                    {...(type === ToggleType.Switch
                        ? {
                              uncheckedColor,
                              checkedColor,
                              trackHeight: switchSize?.trackHeight,
                              borderSize: switchSize?.borderSize,
                          }
                        : {})}
                />
            }
            label={displayText}
            {...formControlLabelProps}
        />
    );
};

const StyledFormControlLabel = styled(FormControlLabel, {
    shouldForwardProp: (prop) =>
        'uncheckedColor' !== prop && 'checkedColor' !== prop,
})<{
    uncheckedColor?: MuiColor;
    checkedColor?: MuiColor;
}>(({ theme, checked, uncheckedColor, checkedColor }) => {
    const checkedFill = checkedColor
        ? theme.palette[checkedColor].main
        : theme.palette.primary.main;
    const uncheckedFill = uncheckedColor
        ? theme.palette[uncheckedColor].main
        : theme.palette.grey[800];
    const checkedDisabled = checkedColor
        ? theme.palette[checkedColor].light
        : theme.palette.primary.main;
    const uncheckedDisabled = uncheckedColor
        ? theme.palette[uncheckedColor].light
        : theme.palette.grey[800];
    const uncheckedHoverColor = uncheckedColor
        ? theme.palette[uncheckedColor].main
        : theme.palette.primary.main;
    return {
        '& .MuiCheckbox-root, & .MuiRadio-root': {
            borderRadius: theme.shape.borderRadius,
            '&:hover': {
                backgroundColor: alpha(
                    checked ? checkedFill : uncheckedHoverColor,
                    0.04
                ),
            },
            '& svg': {
                fill: checked ? checkedFill : uncheckedFill,
            },
            '&.Mui-disabled svg': {
                fill: checked ? checkedDisabled : uncheckedDisabled,
            },
        },
        '& .MuiFormControlLabel-label': {
            color: theme.palette.grey[800],
        },
    };
});
