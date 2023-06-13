import { FeatureFlags } from '@/lib/shared/types';
import { RegisterDTCMemberTransaction } from './definition';

export const checkRegistrationOpen: RegisterDTCMemberTransaction['CHECK_REGISTRATION_OPEN'] =
    {
        async commit({}, { launchDarkly }, {}) {
            const isOpen = await launchDarkly.getFlagForContext(
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
