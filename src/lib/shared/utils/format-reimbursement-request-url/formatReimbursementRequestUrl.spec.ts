import { ConnectionStatus, ProfileType } from '@prisma/client';
import { CANADA, ConnectionRequest, UNITED_STATES } from '../../types';
import {
    formatReimbursementRequestUrl,
    generateTherifyReimbursementDetails,
} from './formatReimbursementRequestUrl';

const baseUrl = 'https://therify.co';
const mockConnectionRequest: ConnectionRequest.Type = {
    connectionStatus: ConnectionStatus.accepted,
    connectionMessage: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    member: {
        id: 'member-123',
        givenName: 'John',
        surname: 'Doe',
        emailAddress: 'member@therify.co',

        memberProfile: {
            insurance: 'Aetna',
            concerns: [],
            goals: [],
            state: UNITED_STATES.STATE.MAP.ALABAMA,
            country: UNITED_STATES.COUNTRY.CODE,
        },
        account: {
            name: 'Test Account',
        },
        plan: null,
    },
    providerProfile: {
        id: 'profile-123',
        givenName: 'Jane',
        surname: 'Doe',
        contactEmail: 'test@test.co',
        practice: {
            name: 'Therify',
            email: 'office@therify.co',
            id: 'practice-123',
        },
    },
};
describe('formatReimbursementRequestUrl', () => {
    const designation = ProfileType.therapist;
    const expectedValues = [
        ['clientname[first]', mockConnectionRequest.member.givenName],
        ['clientname[last]', mockConnectionRequest.member.surname],
        ['clientemail', mockConnectionRequest.member.emailAddress],
        ['clientstate', mockConnectionRequest.member.memberProfile.state],
        ['clientcountry', mockConnectionRequest.member.memberProfile.country],
        ['clientemployer', mockConnectionRequest.member.account.name],
        [
            'providername[first]',
            mockConnectionRequest.providerProfile.givenName,
        ],
        ['providername[last]', mockConnectionRequest.providerProfile.surname],
        ['provideremail', mockConnectionRequest.providerProfile.contactEmail],
        ['billingemail', mockConnectionRequest.providerProfile.practice.email],
        ['practice', mockConnectionRequest.providerProfile.practice.name],
    ];
    const therifyDetails = generateTherifyReimbursementDetails({
        memberId: mockConnectionRequest.member.id,
        providerProfileId: mockConnectionRequest.providerProfile.id,
        practiceId: mockConnectionRequest.providerProfile.practice.id,
    });

    it('should return the correct url for new window', () => {
        expect(
            formatReimbursementRequestUrl({
                baseUrl,
                connectionRequest: mockConnectionRequest,
                designation,
            })
        ).toEqual(
            `${baseUrl}?${[
                ...expectedValues.map((tuple) => tuple.join('=')),
                `servicerendered=Therapy`,
                `therifydetails=${therifyDetails}`,
            ].join('&')}`
        );
    });

    it('should return the correct url for iframe', () => {
        expect(
            formatReimbursementRequestUrl({
                baseUrl,
                connectionRequest: mockConnectionRequest,
                designation,
                hideTitle: true,
            })
        ).toEqual(
            `${baseUrl}?${[
                ...expectedValues.map((tuple) => tuple.join('=')),
                'hidetitle=1',
                'accessedfrom=directory',
                `servicerendered=Therapy`,
                `therifydetails=${therifyDetails}`,
            ].join('&')}`
        );
    });

    it('filters out empty values', () => {
        const lastName = expectedValues[1];
        const [lastNameKey] = lastName;
        const requestMissingLastName = {
            ...mockConnectionRequest,
            member: {
                ...mockConnectionRequest.member,
                surname: undefined,
            },
        } as unknown as ConnectionRequest.Type;
        expect(
            formatReimbursementRequestUrl({
                baseUrl,
                designation: ProfileType.therapist,
                connectionRequest: requestMissingLastName,
            }).includes(lastNameKey)
        ).toBe(false);
    });

    it('should prefill Candian Province', () => {
        const requestWithCanadianProvince = {
            ...mockConnectionRequest,
            member: {
                ...mockConnectionRequest.member,
                memberProfile: {
                    ...mockConnectionRequest.member.memberProfile,
                    state: CANADA.PROVINCE.MAP.ALBERTA,
                    country: CANADA.COUNTRY.CODE,
                },
            },
        } as unknown as ConnectionRequest.Type;
        const url = formatReimbursementRequestUrl({
            baseUrl,
            designation: ProfileType.therapist,
            connectionRequest: requestWithCanadianProvince,
        });
        expect(
            url.includes(`clientprovince=${CANADA.PROVINCE.MAP.ALBERTA}`)
        ).toBe(true);
        expect(url.includes('clientstate')).toBe(false);
    });
});
