import { generateRandomAcceptedInsurance } from '../../accepted-insurance/generate-random-accepted-insurance/generateRandomAcceptedInsurance';
import { getAcceptedInsurances } from './getAcceptedInsurances';
import { generateRandomProfile } from '@/lib/shared/types/provider-profile/generate-random-profile/generateRandomProfile';

describe('getAcceptedInsurances', function () {
    it('returns an array of all insurances a provider accepts', function () {
        const providerProfile = generateRandomProfile({
            acceptedInsurances: [
                generateRandomAcceptedInsurance({
                    country: 'CA',
                    state: 'Alberta',
                    insurances: ['Affinity Health Plan', 'Alliance'],
                }),
                generateRandomAcceptedInsurance({
                    country: 'CA',
                    state: 'Ontario',
                    insurances: ['Alliance', 'Aetna'],
                }),
            ],
        });

        expect(getAcceptedInsurances(providerProfile)).toEqual([
            'Affinity Health Plan',
            'Alliance',
            'Aetna',
        ]);
    });
});
