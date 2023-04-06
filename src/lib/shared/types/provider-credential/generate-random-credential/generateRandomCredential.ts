import { faker } from '@faker-js/faker';
import { ProviderCredential } from '..';
import { Country } from '../../address';
import { CANADA } from '../../address/canada';
import { UNITED_STATES } from '../../address/united-states';

export function generateRandomCredential(
    overrides: Partial<ProviderCredential.ProviderCredential> = {}
): ProviderCredential.ProviderCredential {
    const randomCountry = faker.helpers.arrayElement(
        Country.ENTRIES
    ) as Country.Country;
    if (randomCountry === 'CA') {
        return {
            type: faker.lorem.word(),
            licenseNumber: faker.datatype.number().toString(),
            expirationDate: faker.date.future().toISOString(),
            state: faker.helpers.arrayElement(CANADA.PROVINCE.ENTRIES),
            country: randomCountry,
            ...overrides,
        } as ProviderCredential.ProviderCredential;
    }
    return {
        type: faker.lorem.word(),
        licenseNumber: faker.datatype.number().toString(),
        expirationDate: faker.date.future().toISOString(),
        state: faker.helpers.arrayElement(UNITED_STATES.STATE.ENTRIES),
        country: randomCountry,
        ...overrides,
    } as ProviderCredential.ProviderCredential;
}
