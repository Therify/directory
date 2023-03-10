import { sleep } from './sleep';

describe('sleep', function () {
    it('should return a promise', function () {
        expect(sleep()).toBeInstanceOf(Promise);
    });
    it.skip('should resolve after the specified duration', async function () {
        // Test is flaky. Sporatically awaits for 99ms instead of 100.
        const duration = 100;
        const start = Date.now();
        await sleep(duration);
        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(duration);
    });
});
