import { handlerFactory } from './ping';

describe('Ping event', () => {
    it('should be defined', () => {
        expect(handlerFactory).toBeDefined();
    });
    it('should call console.log', () => {
        const spy = jest.spyOn(console, 'log');
        handlerFactory({ logger: console })({
            message: 'Hello',
            timestamp: 123456789,
        });
        expect(spy).toHaveBeenCalledWith('Ping event received:', {
            message: 'Hello',
            timestamp: 123456789,
        });
    });
});
