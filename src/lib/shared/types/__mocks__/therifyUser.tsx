import { PlanStatus, Role } from '@prisma/client';
import { TherifyUser } from '../therify-user';
import { faker } from '@faker-js/faker';
import { add, sub } from 'date-fns';

type MockPlanType = 'active' | 'inactive' | 'expired' | 'future' | null;
type MockUserType = 'member' | 'therapist' | 'coach' | 'practice-owner';
/**
 * Generates a Therify user object with mock data. Defaults to a member with an active plan.
 * @param options
 * @returns TherifyUser
 */
export const getTherifyUser = (options?: {
    type?: MockUserType;
    isPracticeAdmin?: boolean;
    hasChatEnabled?: boolean;
    plan?: MockPlanType;
}): TherifyUser.TherifyUser => ({
    emailAddress: faker.internet.email(),
    givenName: faker.name.firstName(),
    surname: faker.name.lastName(),
    createdAt: sub(new Date(), { months: 1 }).toISOString(),
    chatAccessToken: 'mock-chat-token',
    userId: 'auth0|' + faker.random.alphaNumeric(24),
    avatarUrl: undefined,
    firebaseToken: undefined,
    memberChannels: [],
    providerChannels: [],
    plan: getPlan(options?.plan),
    hasChatEnabled: false,
    ...getUserType(options?.type),
});

const mockExpiredPlan: Exclude<TherifyUser.TherifyUser['plan'], null> = {
    status: PlanStatus.active,
    startDate: sub(new Date(), { months: 2 }).toISOString(),
    endDate: sub(new Date(), { days: 1 }).toISOString(),
    renews: false,
    seats: 1,
};
const mockActivePlan: Exclude<TherifyUser.TherifyUser['plan'], null> = {
    status: PlanStatus.active,
    startDate: sub(new Date(), { months: 1 }).toISOString(),
    endDate: add(new Date(), { months: 1 }).toISOString(),
    renews: false,
    seats: 1,
};
const mockInctivePlan: Exclude<TherifyUser.TherifyUser['plan'], null> = {
    status: PlanStatus.canceled,
    startDate: sub(new Date(), { months: 1 }).toISOString(),
    endDate: add(new Date(), { months: 1 }).toISOString(),
    renews: false,
    seats: 1,
};
const mockFuturePlan: Exclude<TherifyUser.TherifyUser['plan'], null> = {
    status: PlanStatus.active,
    startDate: add(new Date(), { months: 1 }).toISOString(),
    endDate: add(new Date(), { months: 2 }).toISOString(),
    renews: false,
    seats: 1,
};

function getPlan(plan?: MockPlanType): TherifyUser.TherifyUser['plan'] {
    switch (plan) {
        case undefined:
        case 'active':
            return mockActivePlan;
        case 'inactive':
            return mockInctivePlan;
        case 'expired':
            return mockExpiredPlan;
        case 'future':
            return mockFuturePlan;
        default:
            return null;
    }
}

function getUserType(type?: MockUserType) {
    switch (type) {
        case 'therapist':
            return { roles: [Role.provider_therapist], isPracticeAdmin: false };
        case 'coach':
            return { roles: [Role.provider_coach], isPracticeAdmin: false };
        case 'practice-owner':
            return { roles: [Role.provider_therapist], isPracticeAdmin: true };
        case 'member':
        default:
            return {
                roles: [Role.member],
                isPracticeAdmin: false,
                accountId: faker.datatype.uuid(),
            };
    }
}
