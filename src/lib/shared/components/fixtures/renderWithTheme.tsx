import { therifyDesignSystem } from '../themes/therify-design-system';
import { Theme, ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';

export const renderWithTheme = (
    component: ReactNode,
    themeOverride?: Theme
): ReturnType<typeof render> & { theme: Theme } => {
    const theme = themeOverride ?? therifyDesignSystem;
    return {
        ...render(<ThemeProvider theme={theme}>{component}</ThemeProvider>),
        theme,
    };
};
