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

export const TOGGLE_TYPE = {
    CHECKBOX: 'checkbox',
    RADIO: 'radio',
    SWITCH: 'switch',
} as const;

export type ToggleType = (typeof TOGGLE_TYPE)[keyof typeof TOGGLE_TYPE];

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
        case TOGGLE_TYPE.RADIO:
            return MuiRadio;

        case TOGGLE_TYPE.SWITCH:
            return SwitchUi;

        case TOGGLE_TYPE.CHECKBOX:
        default:
            return MuiCheckbox;
    }
};

export const Toggle = ({
    type = TOGGLE_TYPE.CHECKBOX,
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
                    {...(type === TOGGLE_TYPE.SWITCH
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
    <Toggle type={TOGGLE_TYPE.SWITCH} {...props} />
);
export const Checkbox = (props: Omit<ToggleProps, 'type'>) => (
    <Toggle type={TOGGLE_TYPE.CHECKBOX} {...props} />
);

export const Radio = (props: Omit<ToggleProps, 'type'>) => (
    <Toggle type={TOGGLE_TYPE.RADIO} {...props} />
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
