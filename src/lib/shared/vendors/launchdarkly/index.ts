import { init, LDClient } from 'launchdarkly-node-server-sdk';
import { withLaunchDarklyConfiguration } from './configuration';
import {
    GetFlagForUser,
    GetFlagForContext,
    CreateContextFromUser,
} from './methods';
const globalLaunchDarklyClient = global as unknown as {
    launchdarklyClient: LDClient;
};

export const vendorLaunchDarkly = withLaunchDarklyConfiguration((CONFIG) => {
    if (!globalLaunchDarklyClient.launchdarklyClient) {
        globalLaunchDarklyClient.launchdarklyClient = init(
            CONFIG.LAUNCHDARKLY_SDK_KEY
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
