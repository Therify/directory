import { TherifyUser } from '@/lib/shared/types';
import { LDContext } from 'launchdarkly-node-server-sdk';

export const method = (user: TherifyUser.TherifyUser): LDContext => {
    return {
        key: user.userId,
        email: user.emailAddress,
    };
};
