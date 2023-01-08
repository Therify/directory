import crypto from 'crypto';
import { VendorAuth0 } from '@/lib/vendors/auth0';
import { sleep } from '@/lib/utils';

describe('VendorAuth0', function () {
    let createdUserId: string;
    test('creating an auth0 user', async function () {
        const user = await VendorAuth0.createUser({
            email: 'warren@test.com',
            password: crypto.randomUUID(),
            verify_email: false,
            connection: 'Username-Password-Authentication',
        });
        expect(user).toBeDefined();
        if (user.user_id) {
            createdUserId = user.user_id;
            const fetchedUser = await VendorAuth0.getUser(createdUserId);
            expect(fetchedUser).toBeDefined();
        }
    });
    afterAll(async function () {
        if (createdUserId) {
            await sleep(2_000);
            console.info(`Deleting user ${createdUserId}`);
            await VendorAuth0.deleteUser(createdUserId);
        }
    });
});
