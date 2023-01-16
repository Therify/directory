import { generateMock } from '@anatine/zod-mock';
import { VendorStripe } from '@/lib/vendors/stripe';
import { VendorAuth0 } from '@/lib/vendors/auth0';
import { Role } from '@prisma/client';
import { prismaMock } from '@/lib/prisma/__mock__';
import * as CreateUser from './createUser';
import { inputSchema } from './schema';

describe('CreateUser', function () {
    it('throws an error if the user already exists', async function () {
        prismaMock.user.create.mockRejectedValue(
            new Error('Unique constraint failed on the fields: (`email`)')
        );
        const createUser = CreateUser.factory({
            prisma: prismaMock,
            auth0: {} as VendorAuth0,
            stripe: {} as VendorStripe,
        });
        const input = {
            ...generateMock(inputSchema),
            role: Role.member,
            acceptTermsAndConditions: true,
            password: 'password',
            confirmPassword: 'password',
        };
        await expect(createUser(input)).rejects.toThrow(
            'Unique constraint failed on the fields: (`email`)'
        );
    });
});
