import { Role } from '@prisma/client';
import { isProvider } from '../isProvider';

describe('isProvider', () => {
    it('should return true if the role is a therapist', () => {
        expect(isProvider(Role.provider_therapist)).toBe(true);
    });

    it('should return true if the role a coach', () => {
        expect(isProvider(Role.provider_coach)).toBe(true);
    });

    it('should return false if the role is not a provider', () => {
        expect(isProvider(Role.member)).toBe(false);
    });

    it('should return false if the role is undefined', () => {
        expect(isProvider(undefined)).toBe(false);
    });
});
