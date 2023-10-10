import { renderWithTheme } from '@/lib/shared/components/fixtures';
import { TherifyUser } from '@/lib/shared/types';
import { SettingsPage, SETTINGS_TAB_IDS, TEST_IDS } from './SettingsPage';

const mockUser = {} as TherifyUser.TherifyUser;
describe('SettingsPage', () => {
    it('should render the Account tab', () => {
        const { getByTestId } = renderWithTheme(
            <SettingsPage
                user={mockUser}
                currentTab={SETTINGS_TAB_IDS.ACCOUNT}
                onTabChange={jest.fn()}
            />
        );
        expect(getByTestId(TEST_IDS.ACCOUNT_TAB)).toBeVisible();
    });
    it('should render the Care Details tab', () => {
        const { getByTestId } = renderWithTheme(
            <SettingsPage
                user={mockUser}
                currentTab={SETTINGS_TAB_IDS.CARE_DETAILS}
                onTabChange={jest.fn()}
            />
        );
        expect(getByTestId(TEST_IDS.CARE_DETAILS_TAB)).toBeVisible();
    });
    it('should render the Billing and Payments tab', () => {
        const { getByTestId } = renderWithTheme(
            <SettingsPage
                user={mockUser}
                currentTab={SETTINGS_TAB_IDS.BILLING}
                onTabChange={jest.fn()}
            />
        );
        expect(getByTestId(TEST_IDS.BILLING_TAB)).toBeVisible();
    });
    it('should render the Email Notifications tab', () => {
        const { getByTestId } = renderWithTheme(
            <SettingsPage
                user={mockUser}
                currentTab={SETTINGS_TAB_IDS.NOTIFICATIONS}
                onTabChange={jest.fn()}
            />
        );
        expect(getByTestId(TEST_IDS.NOTIFICATIONS_TAB)).toBeVisible();
    });
    it('calls onTabChange when a tab is clicked', () => {
        const onTabChange = jest.fn();
        const { getByText } = renderWithTheme(
            <SettingsPage
                user={mockUser}
                currentTab={SETTINGS_TAB_IDS.NOTIFICATIONS}
                onTabChange={onTabChange}
            />
        );
        getByText('Care Details').click();
        expect(onTabChange).toHaveBeenCalledWith(SETTINGS_TAB_IDS.CARE_DETAILS);
    });
});