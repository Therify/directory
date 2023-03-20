import { ConnectionStatus } from '@prisma/client';
import { ConnectionRequest, UNITED_STATES } from '../../types';
import { formatReimbursementRequestUrl } from './formatReimbursementRequestUrl';

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
    it('should return the correct url', () => {
        expect(
            formatReimbursementRequestUrl(baseUrl, mockConnectionRequest)
        ).toEqual(
            `${baseUrl}?${expectedValues
                .map((tuple) => tuple.join('='))
                .join('&')}`
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
            formatReimbursementRequestUrl(
                baseUrl,
                requestMissingLastName
            ).includes(lastNameKey)
        ).toBe(false);
    });
});
