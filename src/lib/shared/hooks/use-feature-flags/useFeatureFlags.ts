import { useEffect } from 'react';
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import { FeatureFlags, TherifyUser } from '../../types';

export const useFeatureFlags = (user: TherifyUser.TherifyUser | undefined) => {
    const ldClient = useLDClient();
    const flags = useFlags();

    useEffect(() => {
        if (user && ldClient) {
            const context = ldClient.getContext();
            if (context?.key !== user.userId)
                ldClient.identify({
                    key: user.userId,
                    custom: { email: user.emailAddress },
                });
        }
        if (!user && ldClient) {
            ldClient.identify({
                key: 'anonymous',
            });
        }
    }, [ldClient, user]);

    return {
        flags: FeatureFlags.validate(flags),
    };
};
