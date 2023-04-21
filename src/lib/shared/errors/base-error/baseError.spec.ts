import { BaseError } from './baseError';

describe('BaseError', () => {
    it('should create an instance', () => {
        expect(new BaseError('name', 'message')).toBeTruthy();
    });
    it('should work with instanceof', () => {
        expect(
            new BaseError('name', 'message') instanceof BaseError
        ).toBeTruthy();
    });
});
