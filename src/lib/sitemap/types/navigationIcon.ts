export const NAVIGATION_ICON = {
    ACCOUNT: 'account',
    BILLING: 'billing',
    CHAT: 'chat',
    CLIENTS: 'clients',
    DASHBOARD: 'dashboard',
    HOME: 'home',
    JOURNEY: 'journey',
    LIBRARY: 'library',
    MESSAGING: 'messaging',
    NOTIFICATION: 'notification',
    PAYMENTS: 'payments',
    REFERRAL: 'referral',
    THERAPY: 'therapy',
    PROFILE_EDITOR: 'profile-editor',
} as const;

export type NavigationIcon =
    typeof NAVIGATION_ICON[keyof typeof NAVIGATION_ICON];
