import { format } from 'date-fns';

interface GetCoveredSessionsMessageProps {
    coveredSessions: number;
    remainingSessions: number;
    name: string;
    planEndDate: string;
}
export const getCoveredSessionsMessage = ({
    name,
    coveredSessions,
    remainingSessions,
    planEndDate,
}: GetCoveredSessionsMessageProps) => {
    if (coveredSessions === 0) {
        return `No covered sessions. ${name} will use their insurance benefit to cover sessions or pay out of pocket.`;
    }
    if (remainingSessions === 0) {
        return `${name} has used all of their covered sessions from Therify. They will use their insurance benefit or pay out of pocket.`;
    }

    return `${name} has ${remainingSessions} covered sessions remaining from Therify until ${format(
        new Date(planEndDate),
        'MMMM dd, yyyy'
    )}`;
};
