import { TherifyUser } from '@/lib/shared/types';
import { LDClient } from 'launchdarkly-node-server-sdk';
import { CreateContextFromUser } from '../create-context-from-user';

export const factory =
    (client: LDClient) =>
    async (flag: string, user: TherifyUser.TherifyUser) => {
        return await client.variation(
            flag,
            CreateContextFromUser.method(user),
            false
        );
    };
