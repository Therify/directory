import { init, LDClient } from 'launchdarkly-node-server-sdk';
import { withLaunchDarklyConfiguration } from './configuration';
import { GetFlagForContext } from './methods';
const globalLaunchDarklyClient = global as unknown as {
    launchdarklyClient: LDClient;
};

export const launchDarklyVendor = withLaunchDarklyConfiguration((CONFIG) => {
    if (!globalLaunchDarklyClient.launchdarklyClient) {
        globalLaunchDarklyClient.launchdarklyClient = init(
            CONFIG.LAUNCHDARKLY_SDK_KEY
        );
    }
    const client = globalLaunchDarklyClient.launchdarklyClient;
    return {
        getFlagForContext: GetFlagForContext.factory(client),
    };
});
