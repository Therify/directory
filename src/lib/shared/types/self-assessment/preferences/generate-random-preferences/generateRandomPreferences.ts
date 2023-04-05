import { faker } from '@faker-js/faker';
import type { Preference } from '../preference';
import * as Ethnicity from '../ethnicPreference';
import * as Gender from '../genderPreference';

export function generateRandomPreferences(
    overrides: Partial<Preference> = {}
): Preference {
    return {
        ethnicity: {
            type: 'ethnic',
            selection: faker.helpers.arrayElement(Ethnicity.ENTRIES),
            isRequired: faker.datatype.boolean(),
        },
        gender: {
            type: 'gender',
            selection: faker.helpers.arrayElement(Gender.ENTRIES),
            isRequired: faker.datatype.boolean(),
        },
        lgbtq: {
            type: 'lgbtq',
            isRequired: faker.datatype.boolean(),
        },
        ...overrides,
    };
}
