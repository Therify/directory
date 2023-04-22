import { HttpError } from './httpError';

describe('HttpError', () => {
    describe('toJSON', () => {
        it('should return the correct JSON', () => {
            const httpError = new HttpError(404);
            expect(httpError.toJSON()).toEqual({
                status: 404,
                message: 'Not Found',
                isOperational: true,
            });
        });
    });
});
