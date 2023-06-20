import { FeatureFlags } from '@/lib/shared/types';
import { vendorLaunchDarkly } from '@/lib/shared/vendors/launchdarkly';
import { RegisterDTCMemberTransaction } from './definition';

export const checkRegistrationOpen: RegisterDTCMemberTransaction['CHECK_REGISTRATION_OPEN'] =
    {
        async commit() {
            const isOpen = await vendorLaunchDarkly.getFlagForContext(
                FeatureFlags.SERVER_FLAGS.IS_DTC_REGISTRATION_OPEN,
                {
                    key: 'DTC_MEMBER_REGISTRATION_OPEN_EVALUATION',
                }
            );
            if (!isOpen) {
                throw new Error('Registration is not open at this time');
            }
            return { isOpen };
        },
        async rollback() {},
    };
