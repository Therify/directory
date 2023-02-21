import { ConnectionStatus } from '@prisma/client';
import { ConnectionRequest, State } from '../../types';
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
            concerns: [],
            goals: [],
            state: State.ENTRIES[0],
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
        ['clientemployer', mockConnectionRequest.member.account.name],
        [
            'providername[first]',
            mockConnectionRequest.providerProfile.givenName,
        ],
        ['providername[last]', mockConnectionRequest.providerProfile.surname],
        ['provideremail', mockConnectionRequest.providerProfile.practice.email],
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
