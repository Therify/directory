import { faker } from '@faker-js/faker';
import * as EvidenceBasedApproach from '../../evidenceBasedApproach';
import * as Pronoun from '../../pronoun';
import { Modality } from '../../modality';
import { Language } from '../../language';
import { AgeGroup } from '../../age-group';
import { CommunitiesServed } from '../../communities-served';
import { Ethnicity } from '../../ethnicity';
import { Gender } from '../../gender';
import { Issue } from '../../issues';
import { Religion } from '../../religion';
import { ProviderProfile } from '../providerProfile';
import { generateRandomCredential } from '../../provider-credential/generate-random-credential/generateRandomCredential';
import { generateRandomAcceptedInsurance } from '../../accepted-insurance/generate-random-accepted-insurance/generateRandomAcceptedInsurance';
import { generateRandomSupervisor } from '../../provider-supervisor/generate-random-supervisor/generateRandomSupervisor';

export function generateRandomProfile(
    overrides: Partial<ProviderProfile> = {}
): ProviderProfile {
    return {
        id: faker.datatype.uuid(),
        givenName: faker.name.firstName(),
        surname: faker.name.lastName(),
        contactEmail: faker.internet.email(),
        bio: faker.lorem.paragraph(),
        npiNumber: faker.datatype.number().toString(),
        offersChat: faker.datatype.boolean(),
        profileImageUrl: faker.image.imageUrl(640, 640),
        yearsOfExperience: faker.datatype.number().toString(),
        minimumRate: faker.datatype.number(),
        maximumRate: faker.datatype.number(),
        idealClientDescription: faker.lorem.paragraph(),
        practiceNotes: faker.lorem.paragraph(),
        gender: faker.helpers.arrayElement(Gender.ENTRIES),
        credentials: Array.from({
            length: faker.datatype.number({ min: 1, max: 3 }),
        }).map(() => generateRandomCredential()),
        acceptedInsurances: Array.from({
            length: faker.datatype.number({ min: 1, max: 10 }),
        }).map(() => generateRandomAcceptedInsurance()),
        supervisor: generateRandomSupervisor(),
        specialties: faker.helpers.arrayElements(Issue.ENTRIES),
        isMultiracial: faker.datatype.boolean(),
        ethnicity: faker.helpers.arrayElements(Ethnicity.ENTRIES),
        communitiesServed: faker.helpers.arrayElements(
            CommunitiesServed.ENTRIES
        ),
        religions: faker.helpers.arrayElements(Religion.ENTRIES),
        evidenceBasedPractices: faker.helpers.arrayElements(
            EvidenceBasedApproach.ENTRIES
        ),
        pronouns: faker.helpers.arrayElement(Pronoun.ENTRIES),
        ageGroups: faker.helpers.arrayElements(AgeGroup.ENTRIES),
        offersInPerson: faker.datatype.boolean(),
        offersMedicationManagement: faker.datatype.boolean(),
        offersPhoneConsultations: faker.datatype.boolean(),
        designation: faker.datatype.boolean() ? 'therapist' : 'coach',
        newClientStatus: 'accepting',
        practiceStartDate: faker.date.past().toISOString(),
        offersSlidingScale: faker.datatype.boolean(),
        modalities: faker.helpers.arrayElements(Modality.ENTRIES),
        languagesSpoken: faker.helpers.arrayElements(Language.ENTRIES),
        offersVirtual: faker.datatype.boolean(),
        ...overrides,
    };
}
