import { faker } from '@faker-js/faker';
import type { Type as MemberProfile } from '../memberProfile';
import { Issue } from '../../issues';
import { CANADA, Country, UNITED_STATES } from '../../address';
import { Goal, InsuranceProvider } from '../..';

export function generateRandomMemberProfile(
    overrides: Partial<MemberProfile> = {}
): MemberProfile {
    const country = faker.helpers.arrayElement([
        Country.MAP.CANADA,
        Country.MAP.UNITED_STATES,
    ]);
    const state =
        country === Country.MAP.UNITED_STATES
            ? faker.helpers.arrayElement(UNITED_STATES.STATE.ENTRIES)
            : faker.helpers.arrayElement(CANADA.PROVINCE.ENTRIES);
    return {
        userId: faker.datatype.uuid(),
        concerns: faker.helpers.arrayElements(Issue.ENTRIES),
        country,
        state,
        insurance: faker.helpers.arrayElement(InsuranceProvider.ENTRIES),
        goals: faker.helpers.arrayElements(Goal.ENTRIES),
        ...overrides,
    };
}
