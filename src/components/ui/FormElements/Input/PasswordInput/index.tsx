import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { BUTTON_TYPE, IconButton } from '../../../Button';
import { Input, InputProps } from '../Input';

interface PasswordInputProps extends InputProps {
    allowShowPassword?: boolean;
    buttonTabIndex?: number;
}

export const TEST_IDS = {
    BUTTON: 'button',
    VISIBLE_ICON: 'visible-icon',
    HIDDEN_ICON: 'hidden-icon',
};

const Visibility = (props: {
    isPasswordVisible: boolean;
    tabIndex?: number;
    onClick: () => void;
}) => {
    const theme = useTheme();
    const style = {
        color: theme.palette.grey[400],
        size: 20,
    };
    return (
        <IconButton
            tabIndex={props.tabIndex ?? -1}
            data-testid={TEST_IDS.BUTTON}
            type={BUTTON_TYPE.TEXT}
            onClick={props.onClick}
            style={{ paddingTop: 0, paddingBottom: 0, height: '100%' }}
        >
            {props.isPasswordVisible ? (
                <VisibilityIcon
                    data-testid={TEST_IDS.VISIBLE_ICON}
                    style={style}
                />
            ) : (
                <VisibilityOffIcon
                    data-testid={TEST_IDS.HIDDEN_ICON}
                    style={style}
                />
            )}
        </IconButton>
    );
};

export const PasswordInput = ({
    allowShowPassword,
    buttonTabIndex,
    ...inputProps
}: PasswordInputProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return (
        <Input
            {...inputProps}
            type={isPasswordVisible ? 'text' : 'password'}
            endAdornment={
                allowShowPassword ? (
                    <Visibility
                        tabIndex={buttonTabIndex}
                        isPasswordVisible={isPasswordVisible}
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                ) : undefined
            }
        />
    );
};
