import { Emitter } from './emitter';

describe('Emitter', () => {
    it('should emit and listen to events', () => {
        const emitter = new Emitter<{
            foo: [number, string];
            bar: [boolean];
        }>();

        const fooListener = jest.fn();
        const barListener = jest.fn();

        emitter.on('foo', fooListener);
        emitter.on('bar', barListener);

        emitter.emit('foo', [1, 'hello']);
        emitter.emit('bar', [true]);

        expect(fooListener).toHaveBeenCalledWith([1, 'hello']);
        expect(barListener).toHaveBeenCalledWith([true]);
    });
});
