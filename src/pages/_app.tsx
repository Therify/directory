import { ComponentType } from 'react';
import type { AppProps, AppType } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { ApplicationContainer } from '@/lib/shared/components/ui';
import { withTRPC } from '@trpc/next';
import { UserProvider as Auth0UserProvider } from '@auth0/nextjs-auth0/client';
import { AppRouter } from '@/lib/server/routers/app';
import { TherifyUser, FirebaseClient } from '@/lib/shared/context';
import { therifyDesignSystem } from '@/lib/shared/components/themes/therify-design-system';
import { InAppNotificationsContext } from '@/lib/modules/notifications/components/context';
import { Globals } from '@/lib/shared/components/styles';
import { Alerts } from '@/lib/modules/alerts/context';
import { ErrorBoundary } from '@/lib/shared/components/features/error-boundary';
import { withLDProvider } from 'launchdarkly-react-client-sdk';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '@/lib/shared/utils/emotion-cache/emotionCache';

const LAUNCHDARKLY_CLIENT_SIDE_ID =
    process.env.NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_SIDE_ID;

export interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const App: AppType = ({
    Component,
    pageProps,
    emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={therifyDesignSystem}>
                <Globals />
                <ApplicationContainer>
                    <ErrorBoundary>
                        <Auth0UserProvider>
                            <TherifyUser.Provider>
                                <FirebaseClient.Provider>
                                    <InAppNotificationsContext.Provider>
                                        <Alerts.Provider>
                                            <Component {...pageProps} />
                                        </Alerts.Provider>
                                    </InAppNotificationsContext.Provider>
                                </FirebaseClient.Provider>
                            </TherifyUser.Provider>
                        </Auth0UserProvider>
                    </ErrorBoundary>
                </ApplicationContainer>
            </ThemeProvider>
        </CacheProvider>
    );
};

const FeatureFlagWrappedApp = withLDProvider({
    clientSideID: LAUNCHDARKLY_CLIENT_SIDE_ID!,
})(App as ComponentType<{}>);

export default withTRPC<AppRouter>({
    config({ ctx }) {
        /**
         * If you want to use SSR, you need to use the server's full URL
         * @link https://trpc.io/docs/ssr
         */
        const url = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}/api/trpc`
            : 'http://localhost:3000/api/trpc';
        if (typeof window !== 'undefined') {
            // during client requests
            return {
                url: '/api/trpc',
            };
        }

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
})(FeatureFlagWrappedApp);
