import {
    Checkbox as MuiCheckbox,
    FormControlLabel,
    FormControlLabelProps as MuiFormControlLabelProps,
    Radio as MuiRadio,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Switch as SwitchUi } from './Switch';
import { MuiColor } from './types';

export const TEST_IDS = {
    CONTROL_ELEMENT: 'control-element',
};

export const enum ToggleType {
    Checkbox = 'checkbox',
    Radio = 'radio',
    Switch = 'switch',
}

interface BaseToggleProps {
    displayText?: React.ReactNode;
    uncheckedColor?: MuiColor;
    checkedColor?: MuiColor;
    type?: ToggleType;
    switchSize?: { trackHeight?: number; borderSize?: number };
}

export type ToggleProps = BaseToggleProps &
    Omit<MuiFormControlLabelProps, 'label' | 'control'>;

const getControlElement = (type: ToggleType) => {
    switch (type) {
        case ToggleType.Radio:
            return MuiRadio;

        case ToggleType.Switch:
            return SwitchUi;

        case ToggleType.Checkbox:
        default:
            return MuiCheckbox;
    }
};

export const Toggle = ({
    type = ToggleType.Checkbox,
    displayText,
    uncheckedColor,
    checkedColor,
    switchSize,
    ...formControlLabelProps
}: ToggleProps) => {
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

export const Switch = (props: Omit<ToggleProps, 'type'>) => (
    <Toggle type={ToggleType.Switch} {...props} />
);
export const Checkbox = (props: Omit<ToggleProps, 'type'>) => (
    <Toggle type={ToggleType.Checkbox} {...props} />
);

export const Radio = (props: Omit<ToggleProps, 'type'>) => (
    <Toggle type={ToggleType.Radio} {...props} />
);

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
        '&.MuiFormControlLabel-root': {
            marginLeft: 0,
            marginRight: 0,
        },
        '& .MuiCheckbox-root, & .MuiRadio-root': {
            borderRadius: theme.shape.borderRadius,
            margin: 0,
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
