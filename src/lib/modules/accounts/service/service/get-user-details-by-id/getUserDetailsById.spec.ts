import { Plan, PlanStatus, Role, User } from '@prisma/client';
import { prismaMock } from '@/lib/prisma/__mock__';
import * as GetUserDetailsById from './getUserDetailsById';
import { membersService } from '@/lib/modules/members/service';
import { ProvidersService } from '@/lib/modules/providers/service';
import { AccountsServiceParams } from '../params';

jest.mock('@/lib/modules/members/service', () => {
    return {
        getTherifyUser: jest.fn(),
    };
});
jest.mock('@/lib/modules/providers/service', () => {
    return {
        getTherifyUser: jest.fn(),
    };
});
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
    it.todo('returns user details for a member');
    it.todo('returns user details for a provider');
    it.todo('returns null plan if no plans exist');
});
