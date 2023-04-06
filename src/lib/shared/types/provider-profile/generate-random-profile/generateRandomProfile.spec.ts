import { generateRandomProfile } from './generateRandomProfile';
import { isValid } from '../providerProfile';

describe('Generating a random profile', function () {
    it('should generate a valid profile', function () {
        const profile = generateRandomProfile();
        expect(isValid(profile)).toBeTruthy();
    });
    it('should generate a valid profile with overrides', function () {
        const profile = generateRandomProfile({
            givenName: 'John',
            surname: 'Doe',
        });
        expect(isValid(profile)).toBeTruthy();
        expect(profile.givenName).toEqual('John');
        expect(profile.surname).toEqual('Doe');
    });
});
