import { generateRandomCredential } from './generateRandomCredential';
import { isValid } from '../providerCredential';

describe('Generating a random credential', function () {
    it('should generate a valid credential', function () {
        const credential = generateRandomCredential();
        expect(isValid(credential)).toBeTruthy();
    });
    it('should generate a valid credential with overrides', function () {
        const credential = generateRandomCredential({
            type: 'type',
            licenseNumber: 'licenseNumber',
            expirationDate: 'expirationDate',
            state: 'Tennessee',
            country: 'US',
        });
        expect(isValid(credential)).toBeTruthy();
        expect(credential.type).toEqual('type');
        expect(credential.licenseNumber).toEqual('licenseNumber');
        expect(credential.expirationDate).toEqual('expirationDate');
        expect(credential.state).toEqual('Tennessee');
        expect(credential.country).toEqual('US');
    });
});
