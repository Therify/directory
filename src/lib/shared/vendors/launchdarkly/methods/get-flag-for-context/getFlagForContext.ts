import { LDClient, LDContext } from 'launchdarkly-node-server-sdk';

export const factory =
    (client: LDClient) => async (flag: string, context: LDContext) => {
        return await client.variation(flag, context, false);
    };
