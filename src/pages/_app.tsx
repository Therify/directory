import '../styles/globals.css';
import type { AppProps, AppType } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { THERIFY_THEME } from '../styles/theme';
import { ApplicationContainer } from '@/components/ui/Layout/Containers/ApplicationContainer';
import { withTRPC } from '@trpc/next';
import { AppRouter } from '@/lib/server/routers/app';

const App: AppType = ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeProvider theme={THERIFY_THEME}>
            <ApplicationContainer>
                <Component {...pageProps} />
            </ApplicationContainer>
        </ThemeProvider>
    );
};

export default withTRPC<AppRouter>({
    config({ ctx }) {
        /**
         * If you want to use SSR, you need to use the server's full URL
         * @link https://trpc.io/docs/ssr
         */
        const url = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}/api/trpc`
            : 'http://localhost:3000/api/trpc';

        return {
            url,
            /**
             * @link https://react-query.tanstack.com/reference/QueryClient
             */
            // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
        };
    },
    /**
     * @link https://trpc.io/docs/ssr
     */
    ssr: true,
})(App);
