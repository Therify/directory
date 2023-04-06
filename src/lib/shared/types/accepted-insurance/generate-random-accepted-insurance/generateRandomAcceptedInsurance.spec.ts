import { generateRandomAcceptedInsurance } from './generateRandomAcceptedInsurance';
import { isValid } from '../acceptedInsurance';

describe('Generating a random accepted insurance', function () {
    it('should generate a valid accepted insurance', function () {
        const acceptedInsurance = generateRandomAcceptedInsurance();
        expect(isValid(acceptedInsurance)).toBeTruthy();
    });
    it('should generate a valid accepted insurance with overrides', function () {
        const acceptedInsurance = generateRandomAcceptedInsurance({
            state: 'Tennessee',
            country: 'US',
            insurances: ['Aetna', 'Affinity Health Plan'],
        });
        expect(isValid(acceptedInsurance)).toBeTruthy();
        expect(acceptedInsurance.state).toEqual('Tennessee');
        expect(acceptedInsurance.country).toEqual('US');
        expect(acceptedInsurance.insurances).toEqual([
            'Aetna',
            'Affinity Health Plan',
        ]);
    });
});
