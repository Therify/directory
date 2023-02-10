import { Role } from '@prisma/client';
import { isTherapist } from '../isTherapist';

describe('isTherapist', () => {
    it('should return true if the role is a therapist', () => {
        expect(isTherapist(Role.provider_therapist)).toBe(true);
    });

    it('should return false if the role is not a therapist', () => {
        expect(isTherapist(Role.member)).toBe(false);
    });

    it('should return false if the role is undefined', () => {
        expect(isTherapist(undefined)).toBe(false);
    });
});
