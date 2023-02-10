import { Role } from '@prisma/client';
import { isMember } from '../isMember';

describe('isMember', () => {
    it('should return true if the role is a member', () => {
        expect(isMember(Role.member)).toBe(true);
    });

    it('should return false if the role is not a member', () => {
        expect(isMember(Role.provider_therapist)).toBe(false);
    });

    it('should return false if the role is undefined', () => {
        expect(isMember(undefined)).toBe(false);
    });
});
