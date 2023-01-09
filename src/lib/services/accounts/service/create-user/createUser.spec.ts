import { prismaMock } from '@/lib/prisma/__mock__';
import * as CreateUser from './createUser';
import { inputSchema } from './schema';
import { generateMock } from '@anatine/zod-mock';

describe('CreateUser', function () {
    it('throws an error if the user already exists', async function () {
        prismaMock.user.create.mockRejectedValue(
            new Error('Unique constraint failed on the fields: (`email`)')
        );
        const createUser = CreateUser.factory({ prisma: prismaMock });
        const input = generateMock(inputSchema);
        input.acceptTermsAndConditions = true;
        input.password = 'password';
        input.confirmPassword = 'password';
        await expect(createUser(input)).rejects.toThrow(
            'Unique constraint failed on the fields: (`email`)'
        );
    });
});
