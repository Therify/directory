import '../styles/globals.css';
import type { AppProps, AppType } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { ApplicationContainer } from '@/components/ui';
import { withTRPC } from '@trpc/next';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { AppRouter } from '@/lib/server/routers/app';
import { TherifyUser } from '@/lib/context';
import { therifyDesignSystem } from '../components/themes/therify-design-system';

const App: AppType = ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeProvider theme={therifyDesignSystem}>
            <UserProvider>
                <TherifyUser.Provider>
                    <ApplicationContainer>
                        <Component {...pageProps} />
                    </ApplicationContainer>
                </TherifyUser.Provider>
            </UserProvider>
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
