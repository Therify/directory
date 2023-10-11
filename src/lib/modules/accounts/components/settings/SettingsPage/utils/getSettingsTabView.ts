import { SETTINGS_TAB_IDS } from '../SettingsPage';

export const getSettingsTabView = (view: string | undefined) => {
    switch (view) {
        case SETTINGS_TAB_IDS.CARE_DETAILS:
            return SETTINGS_TAB_IDS.CARE_DETAILS;
        case SETTINGS_TAB_IDS.BILLING:
            return SETTINGS_TAB_IDS.BILLING;
        case SETTINGS_TAB_IDS.NOTIFICATIONS:
            return SETTINGS_TAB_IDS.NOTIFICATIONS;
        case SETTINGS_TAB_IDS.ACCOUNT:
        default:
            return SETTINGS_TAB_IDS.ACCOUNT;
    }
};
