import { Role } from '@prisma/client';
import { hasRole } from '../hasRole';

describe('hasRole', () => {
    it('should return true if user has role', () => {
        expect(hasRole(Role.member, Role.member)).toBe(true);
    });

    it('should return false if user does not have role', () => {
        expect(hasRole(Role.member, Role.provider_coach)).toBe(false);
    });

    it('should return true if user has multiple roles and one of them is the role', () => {
        expect(
            hasRole(Role.member, [Role.member, Role.provider_coach].join(','))
        ).toBe(true);
    });

    it('should return false if user has multiple roles and none of them are the role', () => {
        expect(
            hasRole(
                Role.member,
                [Role.provider_coach, Role.provider_therapist].join(',')
            )
        ).toBe(false);
    });

    it('should handle undefined', () => {
        expect(hasRole(Role.member, undefined)).toBe(false);
    });
});
