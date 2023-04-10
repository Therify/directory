import { faker } from '@faker-js/faker';
import { CANADA, Country, UNITED_STATES } from '../../address';
import {
    ACCEPTED_INSURANCES,
    type AcceptedInsurance,
} from '../acceptedInsurance';

export function generateRandomAcceptedInsurance(
    overrides: Partial<AcceptedInsurance> = {}
): AcceptedInsurance {
    const randomCountry = faker.helpers.arrayElement(
        Country.ENTRIES
    ) as Country.Country;
    if (randomCountry === 'CA') {
        return {
            state: faker.helpers.arrayElement(CANADA.PROVINCE.ENTRIES),
            country: randomCountry,
            insurances: faker.helpers.arrayElements(ACCEPTED_INSURANCES),
            ...overrides,
        } as AcceptedInsurance;
    }
    return {
        state: faker.helpers.arrayElement(UNITED_STATES.STATE.ENTRIES),
        country: randomCountry,
        insurances: faker.helpers.arrayElements(ACCEPTED_INSURANCES),
        ...overrides,
    } as AcceptedInsurance;
}
