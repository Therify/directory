import { sleep } from './sleep';

describe('sleep', () => {
    it('should sleep for the given duration', async () => {
        const start = Date.now();
        await sleep(100);
        const end = Date.now();

        expect(end - start).toBeGreaterThanOrEqual(99);
    });
});
