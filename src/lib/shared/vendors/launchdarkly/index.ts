import { init, LDClient, basicLogger } from 'launchdarkly-node-server-sdk';
import { withLaunchDarklyConfiguration } from './configuration';
import {
    GetFlagForUser,
    GetFlagForContext,
    CreateContextFromUser,
} from './methods';
const globalLaunchDarklyClient = global as unknown as {
    launchdarklyClient: LDClient;
};
const isProd = process.env.NODE_ENV === 'production';

export const vendorLaunchDarkly = withLaunchDarklyConfiguration((CONFIG) => {
    const ldOptions = isProd
        ? {
              logger: basicLogger({ level: 'warn' }),
          }
        : undefined;
    if (!globalLaunchDarklyClient.launchdarklyClient) {
        globalLaunchDarklyClient.launchdarklyClient = init(
            CONFIG.LAUNCHDARKLY_SDK_KEY,
            ldOptions
        );
    }
    const client = globalLaunchDarklyClient.launchdarklyClient;
    return {
        createContextFromUser: CreateContextFromUser.method,
        getFlagForContext: GetFlagForContext.factory(client),
        getFlagForUser: GetFlagForUser.factory(client),
    };
});

export type VendorLaunchDarkly = typeof vendorLaunchDarkly;
