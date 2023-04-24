import { ProfileType } from '@prisma/client';
import { ConnectionRequest } from '../../types';

const REIMBURSEMENT_KEY_MAPS = [
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

type ServiceRendered = 'Mental Health Coaching' | 'Therapy';

export function formatReimbursementRequestUrl({
    baseUrl,
    connectionRequest,
    designation,
    hideTitle,
}: {
    baseUrl: string;
    connectionRequest: ConnectionRequest.Type;
    designation: ProfileType;
    hideTitle?: boolean;
}): string {
    const therifyDetails = generateTherifyReimbursementDetails({
        memberId: connectionRequest.member.id,
        providerProfileId: connectionRequest.providerProfile.id,
        practiceId: connectionRequest.providerProfile.practice.id,
    });
    const reimbursementValues = REIMBURSEMENT_KEY_MAPS.map(
        ([queryKey, connectionRequestKey]) => {
            const value = getParamValue(
                connectionRequest,
                connectionRequestKey
            );
            if (value) return `${queryKey}=${value}`;
        }
    ).filter(Boolean);

    const serviceRendered: ServiceRendered =
        designation === ProfileType.therapist
            ? 'Therapy'
            : 'Mental Health Coaching';

    const queryValues = [
        ...reimbursementValues,
        ...(hideTitle ? ['hidetitle=1', 'accessedfrom=directory'] : []),
        `servicerendered=${serviceRendered}`,
        `therifydetails=${therifyDetails}`,
    ];
    return `${baseUrl}?${queryValues.join('&')}`;
}

export function generateTherifyReimbursementDetails(details: {
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
