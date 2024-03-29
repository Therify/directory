import {
    Gender,
    Pronoun,
    ProviderProfile as ProviderProfileType,
    AreaOfFocus,
    InsuranceProvider,
    Ethnicity,
    CommunitiesServed,
    Religion,
    EvidenceBasedApproach,
    Modality,
    Language,
    AgeGroup,
    UNITED_STATES,
} from '@/lib/shared/types';
import { NewClientStatus, ProfileType } from '@prisma/client';
import { Meta, StoryObj } from '@storybook/react';
import { ProviderProfile } from './ProviderProfile';

const meta: Meta<typeof ProviderProfile> = {
    title: 'components/features/directory/ProviderProfile',
    component: ProviderProfile,
};

const coach: ProviderProfileType.ProviderProfile = {
    id: 'test-id',
    designation: ProfileType.coach,
    newClientStatus: NewClientStatus.accepting,
    supervisor: null,
    givenName: 'John',
    surname: 'Doe',
    contactEmail: 'test@test.com',
    userId: 'test-user-id',
    bio: 'Seeking therapy is a big step that provokes pressing emotional questions: “How can therapy help me? Am I ready to spill my guts to a stranger?” There are logistical challenges: “What will this cost? How can I make the time?” In these days of navigating the ongoing impacts of the pandemic, you likely need support more than ever as you evaluate how you want to live, love, and work. In my practice, I help clients confront the challenges in their lives, including depression, anxiety, substance misuse, and relationship difficulties.',
    npiNumber: '12345',
    offersSlidingScale: true,
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
            country: UNITED_STATES.COUNTRY.CODE,
            state: UNITED_STATES.STATE.MAP.TENNESSEE,
            licenseNumber: '123456',
            type: 'LMFT',
            expirationDate: '2021-12-31',
        },
        {
            country: UNITED_STATES.COUNTRY.CODE,
            state: UNITED_STATES.STATE.MAP.NEW_YORK,
            licenseNumber: '123456',
            type: 'LMFT',
            expirationDate: '2021-12-31',
        },
    ],
    acceptedInsurances: [],
    // supervisor: null,
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
    practiceStartDate: '2010-09-01T00:00:00.000Z',
    offersChat: true,
};
const therapist: ProviderProfileType.ProviderProfile = {
    id: 'test-id',
    supervisor: null,
    givenName: 'John',
    surname: 'Doe',
    contactEmail: 'test@test.com',
    userId: 'test-user-id',
    bio: 'Seeking therapy is a big step that provokes pressing emotional questions: “How can therapy help me? Am I ready to spill my guts to a stranger?” There are logistical challenges: “What will this cost? How can I make the time?” In these days of navigating the ongoing impacts of the pandemic, you likely need support more than ever as you evaluate how you want to live, love, and work. In my practice, I help clients confront the challenges in their lives, including depression, anxiety, substance misuse, and relationship difficulties.',
    npiNumber: '12345',
    offersSlidingScale: true,
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
            country: UNITED_STATES.COUNTRY.CODE,
            state: UNITED_STATES.STATE.MAP.TENNESSEE,
            licenseNumber: '123456',
            type: 'LMFT',
            expirationDate: '2021-12-31',
        },
        {
            country: UNITED_STATES.COUNTRY.CODE,
            state: UNITED_STATES.STATE.MAP.NEW_YORK,
            licenseNumber: '123456',
            type: 'LMFT',
            expirationDate: '2021-12-31',
        },
    ],
    acceptedInsurances: [
        {
            country: UNITED_STATES.COUNTRY.CODE,
            state: UNITED_STATES.STATE.MAP.TENNESSEE,
            insurances: [
                InsuranceProvider.MAP.AETNA,
                InsuranceProvider.MAP.AMERIHEALTH,
                InsuranceProvider.MAP.BLUECROSS_BLUESHIELD,
            ],
        },
        {
            country: UNITED_STATES.COUNTRY.CODE,
            state: UNITED_STATES.STATE.MAP.NEW_YORK,
            insurances: [InsuranceProvider.MAP.BLUECROSS_BLUESHIELD],
        },
    ],
    // supervisor: null,
    specialties: [
        AreaOfFocus.MAP.DEPRESSION,
        AreaOfFocus.MAP.SELF_ESTEEM,
        AreaOfFocus.MAP.STRESS,
        AreaOfFocus.MAP.PARENTING,
    ],
    isMultiracial: false,
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
    offersChat: true,
};

export default meta;

export const Basic: StoryObj<typeof ProviderProfile> = {};

export const TherapistProfile: StoryObj<typeof ProviderProfile> = {
    args: {
        practice: {
            id: 'practice-id',
            name: 'A Better Place Therapy',
            city: 'Nashville',
            state: 'Tennessee',
            email: 'test@therify.co',
            website: 'https://google.com',
        },
        ...therapist,
    },
};
export const CoachProfile: StoryObj<typeof ProviderProfile> = {
    args: {
        practice: {
            id: 'practice-id',
            name: 'Therify',
            city: 'Nashville',
            state: 'Tennessee',
            email: 'test@therify.co',
            website: 'https://therify.co',
        },
        ...coach,
    },
};
