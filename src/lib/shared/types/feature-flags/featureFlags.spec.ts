import { validate, defaultFlags } from './featureFlags';

describe('FeatureFlags validation', () => {
    it('should return default flags when flags are undefined', () => {
        expect(validate(undefined)).toEqual(defaultFlags);
    });

    it('should return default flags when flags are null', () => {
        expect(validate(null)).toEqual(defaultFlags);
    });

    it('should return default flags when flags are not an object', () => {
        expect(validate('not an object')).toEqual(defaultFlags);
    });

    it('should return default flags when flags are an empty object', () => {
        expect(validate({})).toEqual(defaultFlags);
    });

    it('should return flags when flags are valid', () => {
        const flags = {
            ...defaultFlags,
            didFlagsLoad: true,
        };
        expect(validate(flags)).toEqual(flags);
    });

    it('should return default flag value when individual key is invalid', () => {
        const flags = {
            ...defaultFlags,
            didFlagsLoad: 'not a boolean',
        };
        expect(validate(flags)).toEqual(defaultFlags);
    });

    it('should merge partially valid flags with default flags', () => {
        const flags = {
            ...defaultFlags,
            didFlagsLoad: true,
        };
        expect(
            validate({ ...flags, invalidFlag: "this shouldn't be here" })
        ).toEqual(flags);
    });
});
