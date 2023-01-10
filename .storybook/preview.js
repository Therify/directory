import '../src/styles/globals.css';
import { therifyDesignSystem } from '../src/components/themes/therify-design-system';
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
    (Story) => (
        <ThemeProvider theme={therifyDesignSystem}>{Story()}</ThemeProvider>
    ),
];
