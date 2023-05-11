import { Plan, RedeemedSession } from '@prisma/client';
import { isBefore } from 'date-fns';

export const getRemainingSessionCount = (
    plan: {
        coveredSessions: Plan['coveredSessions'];
        endDate: Plan['endDate'];
        startDate: Plan['startDate'];
    },
    redeemedSessions: RedeemedSession[]
) => {
    const { coveredSessions, endDate, startDate } = plan;
    const sessionsInPlan = redeemedSessions.filter(
        (session) =>
            // dateOfSession is after startDate and before endDate
            isBefore(startDate, session.dateOfSession) &&
            isBefore(session.dateOfSession, endDate)
    );
    const remainingSessions = coveredSessions - sessionsInPlan.length;
    return remainingSessions;
};
