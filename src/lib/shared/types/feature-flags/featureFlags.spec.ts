import { validateClientFlags, defaultClientFlags } from './featureFlags';

describe('FeatureFlags validation', () => {
    it('should return default flags when flags are undefined', () => {
        expect(validateClientFlags(undefined)).toEqual(defaultClientFlags);
    });

    it('should return default flags when flags are null', () => {
        expect(validateClientFlags(null)).toEqual(defaultClientFlags);
    });

    it('should return default flags when flags are not an object', () => {
        expect(validateClientFlags('not an object')).toEqual(
            defaultClientFlags
        );
    });

    it('should return default flags when flags are an empty object', () => {
        expect(validateClientFlags({})).toEqual(defaultClientFlags);
    });

    it('should return flags when flags are valid', () => {
        const flags = {
            ...defaultClientFlags,
            didFlagsLoad: true,
        };
        expect(validateClientFlags(flags)).toEqual(flags);
    });

    it('should return default flag value when individual key is invalid', () => {
        const flags = {
            ...defaultClientFlags,
            didFlagsLoad: 'not a boolean',
        };
        expect(validateClientFlags(flags)).toEqual(defaultClientFlags);
    });

    it('should merge partially valid flags with default flags', () => {
        const flags = {
            ...defaultClientFlags,
            didFlagsLoad: true,
        };
        expect(
            validateClientFlags({
                ...flags,
                invalidFlag: "this shouldn't be here",
            })
        ).toEqual(flags);
    });
});
