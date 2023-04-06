import { generateRandomCredential } from '../../provider-credential/generate-random-credential/generateRandomCredential';
import { getLicensedStates } from './getLicensedStates';
import { generateRandomProfile } from '@/lib/shared/types/provider-profile/generate-random-profile/generateRandomProfile';

describe('getLicensedStates', () => {
    it('returns an array of all states a provider is credentialed in', function () {
        const providerProfile = generateRandomProfile({
            credentials: [
                generateRandomCredential({
                    state: 'Alabama',
                    country: 'US',
                }),
                generateRandomCredential({
                    state: 'Alaska',
                    country: 'US',
                }),
                generateRandomCredential({
                    state: 'Alaska',
                    country: 'US',
                }),
            ],
        });
        expect(getLicensedStates(providerProfile)).toEqual([
            'Alabama',
            'Alaska',
        ]);
    });
});
