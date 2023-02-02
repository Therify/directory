import { Plan, PlanStatus, User } from '@prisma/client';
import { prismaMock } from '@/lib/prisma/__mock__';
import * as GetUserDetailsByAuth0Id from './getUserDetailsByAuth0Id';
import { AccountsServiceParams } from '../params';

const mockUserResult = {
    id: 'test-user-id',
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
            billingUserId: 'test-user-id',
        } as Plan,
    ],
} as unknown as User & { plans: Plan[] };

describe('GetUserDetailsByAuth0Id', function () {
    const auth0Id = 'auth0|123';
    it('references newest plan', async function () {
        prismaMock.user.findUniqueOrThrow.mockResolvedValue(mockUserResult);
        const getUserDetailsByAuth0Id = GetUserDetailsByAuth0Id.factory({
            prisma: prismaMock,
        } as unknown as AccountsServiceParams);

        await expect(
            getUserDetailsByAuth0Id({
                auth0Id,
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
                auth0Id,
            },
        });
    });

    it('returns null plan if no plans exist', async function () {
        prismaMock.user.findUniqueOrThrow.mockResolvedValue({
            ...mockUserResult,
            plans: [],
        } as unknown as User);
        const getUserDetailsByAuth0Id = GetUserDetailsByAuth0Id.factory({
            prisma: prismaMock,
        } as unknown as AccountsServiceParams);

        await expect(
            getUserDetailsByAuth0Id({
                auth0Id,
            })
        ).resolves.toEqual({
            user: {
                plan: null,
                userId: mockUserResult.id,
                emailAddress: mockUserResult.emailAddress,
                roles: mockUserResult.roles,
                accountId: mockUserResult.accountId,
                givenName: mockUserResult.givenName,
                surname: mockUserResult.surname,
                createdAt: mockUserResult.createdAt,
                isPracticeAdmin: false,
                auth0Id,
            },
        });
    });
});
