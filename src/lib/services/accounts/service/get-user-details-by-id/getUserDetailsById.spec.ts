import { Plan, PlanStatus, User } from '@prisma/client';
import { prismaMock } from '@/lib/prisma/__mock__';
import * as GetUserDetailsById from './getUserDetailsById';
import { AccountsServiceParams } from '../params';

const mockUserResult = {
    id: 'auth0|123',
    emailAddress: 'test@therify.co',
    roles: [],
    accountId: 'test',
    givenName: 'Test',
    surname: 'Jackson',
    createdAt: new Date('2021-03-01'),
    isPracticeAdmin: true,
    plans: [
        {
            status: PlanStatus.active,
            renews: true,
            startDate: new Date('2021-03-01'),
            endDate: new Date('2021-04-01'),
            seats: 1,
            billingUserId: 'auth0|123',
        } as Plan,
    ],
} as unknown as User & { plans: Plan[] };

describe('GetUserDetailsById', function () {
    const userId = 'auth0|123';
    it('references newest plan', async function () {
        prismaMock.user.findUniqueOrThrow.mockResolvedValue(mockUserResult);
        const getUserDetailsById = GetUserDetailsById.factory({
            prisma: prismaMock,
        } as unknown as AccountsServiceParams);

        await expect(
            getUserDetailsById({
                userId,
            })
        ).resolves.toEqual({
            user: {
                plan: {
                    status: mockUserResult.plans[0].status,
                    endDate: mockUserResult.plans[0].endDate,
                    startDate: mockUserResult.plans[0].startDate,
                    renews: mockUserResult.plans[0].renews,
                    seats: mockUserResult.plans[0].seats,
                },
                isPracticeAdmin: true,
                userId: mockUserResult.id,
                emailAddress: mockUserResult.emailAddress,
                roles: mockUserResult.roles,
                accountId: mockUserResult.accountId,
                givenName: mockUserResult.givenName,
                surname: mockUserResult.surname,
                createdAt: mockUserResult.createdAt,
                id: mockUserResult.id,
            },
        });
    });

    it('returns null plan if no plans exist', async function () {
        prismaMock.user.findUniqueOrThrow.mockResolvedValue({
            ...mockUserResult,
            plans: [],
        } as unknown as User);
        const getUserDetailsById = GetUserDetailsById.factory({
            prisma: prismaMock,
        } as unknown as AccountsServiceParams);

        await expect(
            getUserDetailsById({
                userId,
            })
        ).resolves.toEqual({
            user: {
                id: mockUserResult.id,
                plan: null,
                userId: mockUserResult.id,
                emailAddress: mockUserResult.emailAddress,
                roles: mockUserResult.roles,
                accountId: mockUserResult.accountId,
                givenName: mockUserResult.givenName,
                surname: mockUserResult.surname,
                createdAt: mockUserResult.createdAt,
                isPracticeAdmin: false,
            },
        });
    });
});
