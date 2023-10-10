import { getSettingsTabView } from './getSettingsTabView';
import { SETTINGS_TAB_IDS } from '../SettingsPage';

describe('getSettingsTabView', () => {
    it('returns the view if it is a valid view', () => {
        expect(getSettingsTabView(SETTINGS_TAB_IDS.CARE_DETAILS)).toEqual(
            SETTINGS_TAB_IDS.CARE_DETAILS
        );
        expect(getSettingsTabView(SETTINGS_TAB_IDS.BILLING)).toEqual(
            SETTINGS_TAB_IDS.BILLING
        );
        expect(getSettingsTabView(SETTINGS_TAB_IDS.NOTIFICATIONS)).toEqual(
            SETTINGS_TAB_IDS.NOTIFICATIONS
        );
        expect(getSettingsTabView(SETTINGS_TAB_IDS.ACCOUNT)).toEqual(
            SETTINGS_TAB_IDS.ACCOUNT
        );
    });

    it('returns the default view if the view is not valid', () => {
        expect(getSettingsTabView('not-a-valid-view')).toEqual(
            SETTINGS_TAB_IDS.ACCOUNT
        );
    });
});
