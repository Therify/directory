import { ProfileType, NewClientStatus } from '@prisma/client';
import * as InsuranceProvider from '../insuranceProvider';
import { Gender } from '../gender';
import { ProviderProfile } from '../provider-profile';
import * as AreaOfFocus from '../areaOfFocus';
import { Ethnicity } from '../ethnicity';
import { CommunitiesServed } from '../communities-served';
import * as EvidenceBasedApproach from '../evidenceBasedApproach';
import { Modality } from '../modality';
import { Religion } from '../religion';
import { Language } from '../language';
import * as Pronoun from '../pronoun';
import { AgeGroup } from '../age-group';
import { UNITED_STATES } from '../address';

export const getMockProviderProfile = (
    defaults?: Partial<ProviderProfile.ProviderProfile>
): ProviderProfile.ProviderProfile => ({
    id: 'test-provider-profile-id',
    supervisor: null,
    givenName: 'John',
    surname: 'Doe',
    contactEmail: 'test@test.com',
    bio: 'Seeking therapy is a big step that provokes pressing emotional questions: “How can therapy help me? Am I ready to spill my guts to a stranger?” There are logistical challenges: “What will this cost? How can I make the time?” In these days of navigating the ongoing impacts of the pandemic, you likely need support more than ever as you evaluate how you want to live, love, and work. In my practice, I help clients confront the challenges in their lives, including depression, anxiety, substance misuse, and relationship difficulties.',
    npiNumber: '12345',
    offersSlidingScale: true,
    videoUrl:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    profileImageUrl:
        'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=1600',
    yearsOfExperience: '10+',
    minimumRate: 100,
    maximumRate: 180,
    idealClientDescription:
        'I work with adults, adolescents, and couples. I specialize in working with individuals who are struggling with anxiety, depression, and relationship issues. I also have experience working with individuals who are struggling with substance use and addiction. I am LGBTQIA+ affirming and welcome clients from all backgrounds.',
    practiceNotes:
        'I am goal oriented and believe that therapy should be a collaborative process. I work with clients to identify their goals and develop a plan to achieve them. I believe that therapy is a safe space to explore your thoughts and feelings and to work through difficult situations. I am a firm believer in the power of therapy and the ability of clients to make positive changes in their lives.',
    gender: Gender.MAP.MALE,
    credentials: [
        {
            state: UNITED_STATES.STATE.MAP.TENNESSEE,
            country: UNITED_STATES.COUNTRY.CODE,
            licenseNumber: '123456',
            type: 'LMFT',
            expirationDate: '2021-12-31',
        },
        {
            state: UNITED_STATES.STATE.MAP.NEW_YORK,
            country: UNITED_STATES.COUNTRY.CODE,
            licenseNumber: '234567',
            type: 'LMFT',
            expirationDate: '2021-12-31',
        },
    ],
    acceptedInsurances: [
        {
            country: UNITED_STATES.COUNTRY.CODE,
            state: 'Tennessee',
            insurances: [
                InsuranceProvider.MAP.AETNA,
                InsuranceProvider.MAP.AMERIHEALTH,
                InsuranceProvider.MAP.BLUECROSS_BLUESHIELD,
            ],
        },
        {
            country: UNITED_STATES.COUNTRY.CODE,
            state: 'New York',
            insurances: [InsuranceProvider.MAP.BLUECROSS_BLUESHIELD],
        },
    ],
    specialties: [
        AreaOfFocus.MAP.DEPRESSION,
        AreaOfFocus.MAP.SELF_ESTEEM,
        AreaOfFocus.MAP.STRESS,
        AreaOfFocus.MAP.PARENTING,
    ],
    isMultiracial: true,
    ethnicity: [
        Ethnicity.MAP.BLACK_OR_AFRICAN_AMERICAN,
        Ethnicity.MAP.EAST_ASIAN,
    ],
    communitiesServed: [
        CommunitiesServed.MAP.IMMIGARNAT,
        CommunitiesServed.MAP.SINGLE_PARENT,
    ],
    religions: [Religion.MAP.CHRISTIAN],
    evidenceBasedPractices: [
        EvidenceBasedApproach.ENTRIES[0],
        EvidenceBasedApproach.ENTRIES[3],
        EvidenceBasedApproach.ENTRIES[5],
    ],
    modalities: [Modality.MAP.INDIVIDUALS, Modality.MAP.COUPLES],
    languagesSpoken: [Language.MAP.ENGLISH],
    pronouns: Pronoun.MAP.HE_HIM,
    ageGroups: [AgeGroup.MAP.ADULTS, AgeGroup.MAP.TEENS],
    offersInPerson: true,
    offersMedicationManagement: true,
    offersPhoneConsultations: true,
    offersVirtual: true,
    designation: ProfileType.therapist,
    newClientStatus: NewClientStatus.accepting,
    practiceStartDate: '2010-09-01T00:00:00.000Z',
    offersChat: false,
    ...defaults,
});
