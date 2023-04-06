import { faker } from '@faker-js/faker';
import { ProviderSupervisor } from '..';
import { CANADA, Country, UNITED_STATES } from '../../address';

export function generateRandomSupervisor(
    overrides: Partial<ProviderSupervisor.ProviderSupervisor> = {}
): ProviderSupervisor.ProviderSupervisor {
    const randomCountry = faker.helpers.arrayElement([
        CANADA.COUNTRY.CODE,
        UNITED_STATES.COUNTRY.CODE,
    ]) as Country.Country;
    const randomState = faker.helpers.arrayElement(
        randomCountry === CANADA.COUNTRY.CODE
            ? CANADA.PROVINCE.ENTRIES
            : UNITED_STATES.STATE.ENTRIES
    );
    return {
        name: faker.name.firstName(),
        npiNumber: faker.datatype.number().toString(),
        supervisorLicense: {
            country: randomCountry,
            state: randomState,
            licenseNumber: faker.datatype.number().toString(),
            expiration: faker.date.future().toISOString(),
        } as ProviderSupervisor.ProviderSupervisor['supervisorLicense'],
    };
}
