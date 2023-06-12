import * as ld from 'launchdarkly-node-server-sdk';
import { withLaunchDarklyConfiguration } from './configuration';
import { GetFlagForContext } from './methods';

export const launchDarklyVendor = withLaunchDarklyConfiguration((CONFIG) => {
    const client = ld.init(CONFIG.LAUNCHDARKLY_SDK_KEY);
    return {
        getFlagForContext: GetFlagForContext.factory(client),
    };
});
