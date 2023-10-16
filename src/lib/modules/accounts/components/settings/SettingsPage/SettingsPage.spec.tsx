import { renderWithTheme } from '@/lib/shared/components/fixtures';
import { TherifyUser } from '@/lib/shared/types';
import { SettingsPage, SETTINGS_TAB_IDS, TEST_IDS } from './SettingsPage';

const mockUser = {} as TherifyUser.TherifyUser;

const mockUseCloudinaryWidget = jest.fn();
jest.mock('@/lib/modules/media/components/hooks/userCloudinaryWidget', () => ({
    useCloudinaryWidget: (args: unknown) => mockUseCloudinaryWidget(args),
}));

describe('SettingsPage', () => {
    it('should render the Account tab', () => {
        const { getByTestId } = renderWithTheme(
            <SettingsPage
                user={mockUser}
                currentTab={SETTINGS_TAB_IDS.ACCOUNT}
                onTabChange={jest.fn()}
                onUpdateUserDetails={jest.fn()}
                onImageUploadSuccess={jest.fn()}
                onImageUploadError={jest.fn()}
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
                onUpdateUserDetails={jest.fn()}
                onImageUploadSuccess={jest.fn()}
                onImageUploadError={jest.fn()}
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
                onUpdateUserDetails={jest.fn()}
                onImageUploadSuccess={jest.fn()}
                onImageUploadError={jest.fn()}
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
                onUpdateUserDetails={jest.fn()}
                onImageUploadSuccess={jest.fn()}
                onImageUploadError={jest.fn()}
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
                onUpdateUserDetails={jest.fn()}
                onImageUploadSuccess={jest.fn()}
                onImageUploadError={jest.fn()}
            />
        );
        getByText('Care Details').click();
        expect(onTabChange).toHaveBeenCalledWith(SETTINGS_TAB_IDS.CARE_DETAILS);
    });
});
