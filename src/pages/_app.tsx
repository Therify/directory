import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { therifyDesignSystem } from '@/components/themes/therify-design-system';
import { ApplicationContainer } from '@/components/ui/Layout/Containers/ApplicationContainer';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={therifyDesignSystem}>
            <ApplicationContainer>
                <Component {...pageProps} />
            </ApplicationContainer>
        </ThemeProvider>
    );
}
