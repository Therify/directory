import { faker } from '@faker-js/faker';
import { Issue } from '../../issues';
import type { SelfAssessment } from '../selfAssessment';
import { generateRandomPreferences } from '../preferences/generate-random-preferences';

export function generateRandomSelfAssessment(
    overrides: Partial<SelfAssessment> = {}
): SelfAssessment {
    return {
        concerns: faker.helpers.arrayElements(Issue.ENTRIES),
        isCaregiver: faker.datatype.boolean(),
        isLGBTQ: faker.datatype.boolean(),
        isInCrisis: faker.datatype.boolean(),
        hasSuicidalIdeation: faker.datatype.boolean(),
        phq9Score: faker.datatype.number({ min: 0, max: 27 }),
        preferences: generateRandomPreferences(overrides.preferences),
        ...overrides,
    };
}
