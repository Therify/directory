import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { THERIFY_THEME } from '../styles/theme';
import { ApplicationContainer } from '@/components/ui/Layout/Containers/ApplicationContainer';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={THERIFY_THEME}>
            <ApplicationContainer>
                <Component {...pageProps} />
            </ApplicationContainer>
        </ThemeProvider>
    );
}
