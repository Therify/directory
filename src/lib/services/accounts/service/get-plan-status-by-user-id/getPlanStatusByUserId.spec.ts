import { VendorStripe } from '@/lib/vendors/stripe';
import { VendorAuth0 } from '@/lib/vendors/auth0';
import { Plan, PlanStatus, User } from '@prisma/client';
import { prismaMock } from '@/lib/prisma/__mock__';
import * as GetPlanStatusByUserId from './getPlanStatusByUserId';

describe('GetPlanStatusByUserId', function () {
    it('sorts and references newest plan', async function () {
        prismaMock.user.findUniqueOrThrow.mockResolvedValue({
            plans: [
                {
                    createdAt: new Date('2021-02-01'),
                    status: PlanStatus.canceled,
                } as Plan,
                {
                    createdAt: new Date('2021-03-01'),
                    status: PlanStatus.active,
                } as Plan,
                {
                    createdAt: new Date('2021-01-03'),
                    status: PlanStatus.past_due,
                } as Plan,
            ],
        } as unknown as User);
        const getPlanStatusByUserId = GetPlanStatusByUserId.factory({
            prisma: prismaMock,
            auth0: {} as VendorAuth0,
            stripe: {} as VendorStripe,
        });

        await expect(
            getPlanStatusByUserId({
                auth0Id: 'auth0|123',
            })
        ).resolves.toEqual({
            status: PlanStatus.active,
        });
    });

    it('returns null if no plans exist', async function () {
        prismaMock.user.findUniqueOrThrow.mockResolvedValue({
            plans: [],
        } as unknown as User);
        const getPlanStatusByUserId = GetPlanStatusByUserId.factory({
            prisma: prismaMock,
            auth0: {} as VendorAuth0,
            stripe: {} as VendorStripe,
        });

        await expect(
            getPlanStatusByUserId({
                auth0Id: 'auth0|123',
            })
        ).resolves.toEqual({
            status: null,
        });
    });
});
