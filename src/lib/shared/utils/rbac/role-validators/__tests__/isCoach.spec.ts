import { Role } from '@prisma/client';
import { isCoach } from '../isCoach';

describe('isCoach', () => {
    it('should return true if the role is a coach', () => {
        expect(isCoach(Role.provider_coach)).toBe(true);
    });

    it('should return false if the role is not a coach', () => {
        expect(isCoach(Role.provider_therapist)).toBe(false);
    });

    it('should return false if the role is undefined', () => {
        expect(isCoach(undefined)).toBe(false);
    });
});
