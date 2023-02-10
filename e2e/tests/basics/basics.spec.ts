import { sleep } from '@/lib/shared/utils';

describe('sleep', function () {
    it('should sleep', async function () {
        const start = Date.now();
        await sleep(1000);
        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(1000);
    });
});
