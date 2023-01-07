import { THERIFY_THEME } from '@/styles/theme';
import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Meta, StoryObj, StoryFn } from '@storybook/react';
import Button, { ButtonProps, BUTTON_COLORS, BUTTON_SIZE } from './Button';

const meta: Meta = {
    title: 'Components/Button',
    component: Button,
};

export const Default: StoryObj<ButtonProps> = {
    args: {
        children: 'Button',
    },
};

export const Buttons: StoryFn<ButtonProps> = (args) => {
    return (
        <>
            {Object.keys(BUTTON_COLORS).map((color) => (
                <div key={color}>
                    <Typography variant="h2">
                        {BUTTON_COLORS[color as keyof typeof BUTTON_COLORS]}
                    </Typography>
                    {Object.keys(BUTTON_SIZE).map((size) => (
                        <>
                            <Button
                                color={
                                    BUTTON_COLORS[
                                        color as keyof typeof BUTTON_COLORS
                                    ]
                                }
                                size={
                                    BUTTON_SIZE[
                                        size as keyof typeof BUTTON_SIZE
                                    ]
                                }
                            >
                                {size}
                            </Button>
                        </>
                    ))}
                </div>
            ))}
        </>
    );
};

export default meta;
