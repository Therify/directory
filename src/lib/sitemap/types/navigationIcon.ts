export const NAVIGATION_ICON = {
    ACCOUNT: 'account',
    BILLING: 'billing',
    CHAT: 'chat',
    CLIENTS: 'clients',
    DASHBOARD: 'dashboard',
    DIRECTORY: 'directory',
    FAVORITES: 'favorites',
    HOME: 'home',
    JOURNEY: 'journey',
    LIBRARY: 'library',
    MESSAGING: 'messaging',
    NOTIFICATION: 'notification',
    PAYMENTS: 'payments',
    PROFILE_EDITOR: 'profile-editor',
    REFERRAL: 'referral',
    THERAPY: 'therapy',
    THERIFY_ICON: 'therify-icon',
    CARE: 'therapy',
    SETTINGS: 'settings',
    INFO: 'care-details',
    SAVED_CONTENT: 'saved-content',
    LOGOUT: 'logout',
} as const;

export type NavigationIcon =
    (typeof NAVIGATION_ICON)[keyof typeof NAVIGATION_ICON];
