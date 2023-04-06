import { ConnectionRequest } from '../../types';

const REIMBURSMENT_KEY_MAPS = [
    ['clientname[first]', 'member.givenName'],
    ['clientname[last]', 'member.surname'],
    ['clientemail', 'member.emailAddress'],
    ['clientstate', 'member.memberProfile.state'],
    ['clientcountry', 'member.memberProfile.country'],
    ['clientemployer', 'member.account.name'],
    ['providername[first]', 'providerProfile.givenName'],
    ['providername[last]', 'providerProfile.surname'],
    ['provideremail', 'providerProfile.contactEmail'],
    ['billingemail', 'providerProfile.practice.email'],
    ['practice', 'providerProfile.practice.name'],
] as const;

export function formatReimbursementRequestUrl(
    baseUrl: string,
    connectionRequest: ConnectionRequest.Type
): string {
    const therifyDetails = generateTherifyReimbursementDetails({
        memberId: connectionRequest.member.id,
        providerProfileId: connectionRequest.providerProfile.id,
        practiceId: connectionRequest.providerProfile.practice.id,
    });
    return `${baseUrl}?${REIMBURSMENT_KEY_MAPS.map(
        ([queryKey, connectionRequestKey]) => {
            const value = getParamValue(
                connectionRequest,
                connectionRequestKey
            );
            if (value) return `${queryKey}=${value}`;
        }
    )
        .filter(Boolean)
        .join('&')}&therifydetails=${therifyDetails}`;
}

function generateTherifyReimbursementDetails(details: {
    memberId: string;
    providerProfileId: string;
    practiceId: string;
}) {
    return encodeURIComponent(JSON.stringify(details));
}

function getParamValue(
    connectionRequest: ConnectionRequest.Type,
    key: string
): string {
    const keys = key.split('.');
    let currentNode: unknown = connectionRequest;
    for (const key of keys) {
        currentNode =
            typeof currentNode === 'object' && currentNode !== null
                ? (currentNode as Record<string, unknown>)[key]
                : '';
    }
    return currentNode?.toString() ?? '';
}
