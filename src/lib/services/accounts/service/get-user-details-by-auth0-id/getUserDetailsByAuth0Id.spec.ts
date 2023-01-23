import { VendorStripe } from '@/lib/vendors/stripe';
import { VendorAuth0 } from '@/lib/vendors/auth0';
import { Plan, PlanStatus, User } from '@prisma/client';
import { prismaMock } from '@/lib/prisma/__mock__';
import * as GetUserDetailsByAuth0Id from './getUserDetailsByAuth0Id';

const mockUserResult = {
    id: 'test-user-id',
    email: 'test@therify.co',
    roles: [],
    accountId: 'test',

    plans: [
        {
            createdAt: new Date('2021-03-01'),
            status: PlanStatus.active,
            renews: true,
            endDate: new Date('2021-04-01'),
            seats: 1,
        } as Plan,
    ],
} as unknown as User & { plans: Plan[] };

describe('GetUserDetailsByAuth0Id', function () {
    it('references newest plan', async function () {
        prismaMock.user.findUniqueOrThrow.mockResolvedValue(mockUserResult);
        const getUserDetailsByAuth0Id = GetUserDetailsByAuth0Id.factory({
            prisma: prismaMock,
            auth0: {} as VendorAuth0,
            stripe: {} as VendorStripe,
        });

        await expect(
            getUserDetailsByAuth0Id({
                auth0Id: 'auth0|123',
            })
        ).resolves.toEqual({
            details: {
                plan: {
                    status: mockUserResult.plans[0].status,
                    endDate: mockUserResult.plans[0].endDate,
                    renews: mockUserResult.plans[0].renews,
                    seats: mockUserResult.plans[0].seats,
                },
                user: {
                    userId: mockUserResult.id,
                    email: mockUserResult.emailAddress,
                    roles: mockUserResult.roles,
                    accountId: mockUserResult.accountId,
                },
            },
        });
    });

    it('returns null plan if no plans exist', async function () {
        prismaMock.user.findUniqueOrThrow.mockResolvedValue({
            plans: [],
        } as unknown as User);
        const getUserDetailsByAuth0Id = GetUserDetailsByAuth0Id.factory({
            prisma: prismaMock,
            auth0: {} as VendorAuth0,
            stripe: {} as VendorStripe,
        });

        await expect(
            getUserDetailsByAuth0Id({
                auth0Id: 'auth0|123',
            })
        ).resolves.toEqual({
            details: {
                plan: null,
                user: {
                    userId: mockUserResult.id,
                    email: mockUserResult.emailAddress,
                    roles: mockUserResult.roles,
                    accountId: mockUserResult.accountId,
                },
            },
            status: null,
        });
    });
});
