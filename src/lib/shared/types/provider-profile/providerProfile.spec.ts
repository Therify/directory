import {
    NewClientStatus,
    ProfileType,
    ProviderProfile as PrismaProviderProfile,
} from '@prisma/client';
import { Pronoun, UNITED_STATES } from '..';
import { validate } from './providerProfile';

const mockProfile: PrismaProviderProfile = {
    id: '1',
    givenName: 'John',
    surname: 'Doe',
    contactEmail: 'test@therify.co',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 'user-id-1',
    bio: 'This is a bio',
    npiNumber: '1234567890',
    offersSlidingScale: false,
    profileImageUrl: null,
    yearsOfExperience: null,
    minimumRate: 40,
    maximumRate: null,
    idealClientDescription: null,
    practiceNotes: null,
    gender: 'male',
    credentials: [],
    acceptedInsurances: [],
    supervisor: null,
    specialties: [],
    isMultiracial: false,
    ethnicity: [],
    communitiesServed: [],
    religions: [],
    evidenceBasedPractices: [],
    modalities: [],
    languagesSpoken: [],
    pronouns: Pronoun.MAP.HE_HIM,
    ageGroups: [],
    offersInPerson: false,
    offersMedicationManagement: false,
    offersPhoneConsultations: false,
    offersVirtual: false,
    designation: ProfileType.therapist,
    newClientStatus: NewClientStatus.accepting,
    practiceStartDate: new Date(),
    offersChat: false,
};

describe('ProviderProfile.validate', () => {
    it('should validate a valid profile', () => {
        expect(() => validate(mockProfile)).not.toThrow();
    });
    it('should throw with invalid profile', () => {
        expect(() => validate({ ...mockProfile, givenName: {} })).toThrow();
    });
    describe('supervisor', () => {
        it('should throw with invalid supervisor', () => {
            expect(() =>
                validate({
                    ...mockProfile,
                    supervisor: {
                        name: 'John Doe',
                    },
                })
            ).toThrow();
        });
        it('should convert {} to null', () => {
            const { supervisor } = validate({
                ...mockProfile,
                supervisor: {},
            });
            expect(supervisor).toBeNull();
        });
        it('should allow null as value', () => {
            const { supervisor } = validate({
                ...mockProfile,
                supervisor: null,
            });
            expect(supervisor).toBeNull();
        });
        it('should validate a valid supervisor', () => {
            const mockSupervisor = {
                name: 'John Doe',
                npiNumber: '123',
                supervisorLicense: {
                    expiration: new Date(),
                    licenseNumber: '123',
                    state: UNITED_STATES.STATE.ENTRIES[0],
                    country: UNITED_STATES.COUNTRY.CODE,
                },
            };
            const { supervisor } = validate({
                ...mockProfile,
                supervisor: mockSupervisor,
            });
            expect(supervisor).toEqual({
                ...mockSupervisor,
                supervisorLicense: {
                    ...mockSupervisor.supervisorLicense,
                    expiration:
                        mockSupervisor.supervisorLicense.expiration.toISOString(),
                },
            });
        });
    });
});
