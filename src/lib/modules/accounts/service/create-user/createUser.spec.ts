import { Role } from '@prisma/client';
import { prismaMock } from '@/lib/prisma/__mock__';
import * as CreateUser from './createUser';
import { Input } from './schema';
import { faker } from '@faker-js/faker';
import { AccountsServiceParams } from '../params';

describe('CreateUser', function () {
    it('throws an error if the user already exists', async function () {
        prismaMock.user.create.mockRejectedValue(
            new Error('Unique constraint failed on the fields: (`email`)')
        );
        const createUser = CreateUser.factory({
            prisma: prismaMock,
        } as unknown as AccountsServiceParams);
        const input: Input = {
            givenName: faker.name.firstName(),
            surname: faker.name.lastName(),
            dateOfBirth: faker.date.past(18),
            emailAddress: faker.internet.email(),
            roles: [Role.member],
            hasAcceptedTermsAndConditions: true,
            password: 'password',
            confirmPassword: 'password',
            id: 'auth0|id',
        };
        await expect(createUser(input)).rejects.toThrow(
            'Unique constraint failed on the fields: (`email`)'
        );
    });
});
