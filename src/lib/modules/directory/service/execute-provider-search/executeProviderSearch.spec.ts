import { prismaMock } from '@/lib/prisma/__mock__';
import { addYears } from 'date-fns';
import { ProviderProfile, ProfileType, NewClientStatus } from '@prisma/client';
import {
    AgeGroup,
    AreaOfFocus,
    CommunitiesServed,
    Ethnicity,
    EvidenceBasedApproach,
    Gender,
    InsuranceProvider,
    Language,
    Modality,
    Pronoun,
    UNITED_STATES,
} from '@/lib/shared/types';
import { DirectoryServiceParams } from '../params';
import { factory } from './executeProviderSearch';

const mockPrismaProviderProfile: ProviderProfile = {
    createdAt: new Date('2021-03-01'),
    updatedAt: new Date('2021-03-01'),
    id: 'test-provider-profile-id',
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
            state: UNITED_STATES.STATE.MAP.TENNESSEE,
            country: UNITED_STATES.COUNTRY.CODE,
            licenseNumber: '123456',
            type: 'LMFT',
            expirationDate: addYears(new Date(), 1).toISOString(),
        },
        {
            state: UNITED_STATES.STATE.MAP.NEW_YORK,
            country: UNITED_STATES.COUNTRY.CODE,
            licenseNumber: '123456',
            type: 'LMFT',
            expirationDate: addYears(new Date(), 1).toISOString(),
        },
    ],
    acceptedInsurances: [
        {
            state: 'Tennessee',
            country: UNITED_STATES.COUNTRY.CODE,
            insurances: [
                InsuranceProvider.MAP.AETNA,
                InsuranceProvider.MAP.AMERIHEALTH,
                InsuranceProvider.MAP.BLUECROSS_BLUESHIELD,
            ],
        },
        {
            state: 'New York',
            country: UNITED_STATES.COUNTRY.CODE,
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
    religions: [],
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
    offersChat: true,
    designation: ProfileType.therapist,
    newClientStatus: NewClientStatus.accepting,
    practiceStartDate: new Date('2010-09-01T00:00:00.000Z'),
};

describe('executeProviderSearch', () => {
    const executeProviderSearch = factory({
        prisma: prismaMock,
    } as unknown as DirectoryServiceParams);

    describe('therapists', () => {
        it('should return valid profiles', async () => {
            prismaMock.providerProfile.findMany.mockResolvedValue([
                mockPrismaProviderProfile,
            ]);
            const { profiles } = await executeProviderSearch({
                state: UNITED_STATES.STATE.MAP.NEW_YORK,
                country: UNITED_STATES.COUNTRY.CODE,
            });
            await expect(profiles.length).toBe(1);
        });
        it('should filter out therapists with no credentials', async () => {
            prismaMock.providerProfile.findMany.mockResolvedValue([
                {
                    ...mockPrismaProviderProfile,
                    credentials: [],
                },
            ]);
            const { profiles } = await executeProviderSearch({
                state: UNITED_STATES.STATE.MAP.NEW_YORK,
                country: UNITED_STATES.COUNTRY.CODE,
            });
            await expect(profiles.length).toBe(0);
        });
        it('should filter out therapists with no credentials for the given state', async () => {
            prismaMock.providerProfile.findMany.mockResolvedValue([
                {
                    ...mockPrismaProviderProfile,
                    credentials: [mockPrismaProviderProfile.credentials[0]],
                },
            ]);
            const { profiles } = await executeProviderSearch({
                state: UNITED_STATES.STATE.MAP.NEW_YORK,
                country: UNITED_STATES.COUNTRY.CODE,
            });
            await expect(profiles.length).toBe(0);
        });
        it('should filter out therapists with expired credentials', async () => {
            prismaMock.providerProfile.findMany.mockResolvedValue([
                {
                    ...mockPrismaProviderProfile,
                    credentials: [
                        {
                            type: 'LMFT',
                            licenseNumber: '123456',
                            state: 'New York',
                            expirationDate: addYears(
                                new Date(),
                                -1
                            ).toISOString(),
                        },
                    ],
                },
            ]);
            const { profiles } = await executeProviderSearch({
                state: UNITED_STATES.STATE.MAP.NEW_YORK,
                country: UNITED_STATES.COUNTRY.CODE,
            });
            await expect(profiles.length).toBe(0);
        });

        it('should safely filter out therapists with malformed credentials', async () => {
            prismaMock.providerProfile.findMany.mockResolvedValue([
                {
                    ...mockPrismaProviderProfile,
                    credentials: [
                        {
                            state: 'New York',
                            expirationDate: addYears(
                                new Date(),
                                -1
                            ).toISOString(),
                        },
                    ],
                },
            ]);
            const { profiles } = await executeProviderSearch({
                state: UNITED_STATES.STATE.MAP.NEW_YORK,
                country: UNITED_STATES.COUNTRY.CODE,
            });
            await expect(profiles.length).toBe(0);
        });
    });

    describe('coaches', () => {
        it('should not filter coaches by credentials', async () => {
            prismaMock.providerProfile.findMany.mockResolvedValue([
                {
                    ...mockPrismaProviderProfile,
                    credentials: [],
                    designation: ProfileType.coach,
                },
            ]);
            const { profiles } = await executeProviderSearch({
                state: UNITED_STATES.STATE.MAP.NEW_YORK,
                country: UNITED_STATES.COUNTRY.CODE,
            });
            expect(profiles.length).toBe(1);
        });
    });
});
