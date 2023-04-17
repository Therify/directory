const KEY_MAPS = [
    ['accountid', 'accountId'],
    ['userid', 'userId'],
    ['email', 'email'],
    ['plantype', 'planType'],
    ['billingcycle', 'billingCycle'],
    ['seatcount', 'seatCount'],
    ['coveredsessions', 'coveredSessions'],
] as const;
interface PlanDetails {
    accountId: string;
    userId: string;
    email: string;
    planType: 'Individual' | 'Team';
    billingCycle: 'Month' | 'Biannual' | 'Annual';
    seatCount: number;
    coveredSessions: number;
}

export function formatMembershipPlanChangeRequestUrl(
    baseUrl: string,
    planDetails: PlanDetails
): string {
    return `${baseUrl}?${KEY_MAPS.map(([queryKey, planKey]) => {
        const value = planDetails[planKey];
        if (value) return `${queryKey}=${value}`;
    })
        .filter(Boolean)
        .join('&')}`;
}
