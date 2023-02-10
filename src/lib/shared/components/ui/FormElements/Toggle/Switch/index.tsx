import { Switch as MuiSwitch, SwitchProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MuiColor } from '../types';

const BaseSwitch = ({ checked, ...props }: SwitchProps) => (
    <MuiSwitch
        className={checked ? 'on' : 'off'}
        checked={checked}
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        {...props}
    />
);
export const Switch = styled(BaseSwitch, {
    shouldForwardProp: (prop) =>
        'uncheckedColor' !== prop &&
        'checkedColor' !== prop &&
        'borderSize' !== prop &&
        'trackHeight' !== prop,
})<{
    uncheckedColor?: MuiColor;
    trackHeight?: number;
    checkedColor?: MuiColor;
    borderSize?: number;
}>(
    ({
        theme,
        checked,
        checkedColor,
        uncheckedColor,
        trackHeight = 24,
        borderSize = 2,
    }) => {
        const thumbSize = trackHeight - borderSize * 2;
        const trackWidth = thumbSize * 2;

        const checkedFill = checkedColor
            ? theme.palette[checkedColor].main
            : theme.palette.primary.main;
        const uncheckedFill = uncheckedColor
            ? theme.palette[uncheckedColor].main
            : theme.palette.grey[200];
        const checkedDisabled = checkedColor
            ? theme.palette[checkedColor].light
            : theme.palette.primary.main;
        const uncheckedDisabled = uncheckedColor
            ? theme.palette[uncheckedColor].light
            : theme.palette.grey[800];

        return {
            marginRight: theme.spacing(2),
            width: trackWidth,
            height: trackHeight,
            padding: 0,
            '& .MuiSwitch-switchBase': {
                padding: 0,
                margin: borderSize,
                transitionDuration: '200ms',
                '&.Mui-checked': {
                    transform: `translateX(${thumbSize - borderSize * 2}px)`,
                    color: '#fff',
                    '& + .MuiSwitch-track': {
                        opacity: 1,
                        border: 0,
                    },
                    '&.Mui-disabled + .MuiSwitch-track': {
                        backgroundColor: checkedDisabled,
                        opacity: 0.5,
                    },
                },
                '&.Mui-focusVisible .MuiSwitch-thumb': {
                    color: checkedColor,
                    border: '1px solid #fff',
                },
                '&.Mui-disabled .MuiSwitch-thumb': {
                    color: theme.palette.primary.contrastText,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    backgroundColor: uncheckedDisabled,
                },
            },
            '& .MuiSwitch-thumb': {
                boxSizing: 'border-box',
                boxShadow: 'none',
                width: thumbSize,
                height: thumbSize,
            },
            '& .MuiSwitch-track': {
                borderRadius: trackHeight / 2,
                backgroundColor: checked ? checkedFill : uncheckedFill,
                opacity: 1,
                transition: theme.transitions.create(['background-color'], {
                    duration: 200,
                }),
            },
        };
    }
);
