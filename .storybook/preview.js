import '../src/styles/globals.css';
import { THERIFY_THEME } from '../src/styles/theme';
import { ThemeProvider } from '@mui/material/styles';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

export const decorators = [
    (Story) => <ThemeProvider theme={THERIFY_THEME}>{Story()}</ThemeProvider>,
];
