import userEvent from '@testing-library/user-event';
import { TEST_IDS as NOTIFICATION_DRAWER_TEST_IDS } from '@/lib/modules/notifications/components/ui/NotificationDrawer/NotificationDrawer';
import { TEST_IDS as NAVIGATION_DRAWER_TEST_IDS } from '@/lib/shared/components/ui/Navigation/NavigationDrawer/NavigationDrawer';
import { renderWithTheme } from '@/lib/shared/components/fixtures';
import { TEST_IDS as TOP_NAVIGATION_TEST_IDS } from '@/lib/shared/components/ui/Navigation/v3/SecondaryNavigationControls/SecondaryNavigationControls';
import {} from '@/lib/shared/components/ui/';
import { Notification, TherifyUser } from '@/lib/shared/types';
import {
    MEMBER_MAIN_MENU,
    MEMBER_SECONDARY_MENU,
    MEMBER_MOBILE_MENU,
    URL_PATHS,
} from '@/lib/sitemap';
import { Role } from '@prisma/client';
import { TopNavigationPage } from './TopNavigationPage';
import { within } from '@testing-library/react';

const mockUseFeatureFlags = jest.fn();
const mockUsePlanMonitoring = jest.fn();
const mockUseMediaQuery = jest.fn();
jest.mock('@mui/material/useMediaQuery', () => () => mockUseMediaQuery());
jest.mock('@/lib/shared/hooks/', () => ({
    usePlanMonitoring: (args: unknown) => mockUsePlanMonitoring(args),
    useFeatureFlags: (args: unknown) => mockUseFeatureFlags(args),
}));
const mockOpenNotifiations = jest.fn();
const mockCloseNotifications = jest.fn();
const mockClearNotifications = jest.fn();
const mockHandleAction = jest.fn();
const mockGetNotificationsMapForMenu = jest.fn();

const mockUseNotificationsResult = {
    display: {
        isOpen: false,
        open: (args: unknown) => mockOpenNotifiations(args),
        close: (args: unknown) => mockCloseNotifications(args),
    },
    notifications: [],
    unreadCount: 0,
    clearActionlessNotifications: () => mockClearNotifications(),
    handleAction: (notification: Notification.InApp.PersitedType) =>
        mockHandleAction(notification),
    getNotificationsMapForMenu: (args: unknown) =>
        mockGetNotificationsMapForMenu(args),
};
const mockUseNotifications = jest.fn();

jest.mock('@/lib/modules/notifications/components/hooks', () => ({
    useInAppNotifications: (args: unknown) => mockUseNotifications(args),
}));

const mockUser = {
    id: '123',
    email: 'test@therify.co',
    givenName: 'Test',
    roles: [Role.member],
} as unknown as TherifyUser.TherifyUser;

describe('TopNavigationPage', () => {
    const user = userEvent.setup();
    const primaryMenu = [...MEMBER_MAIN_MENU];
    const secondaryMenu = [...MEMBER_SECONDARY_MENU];
    const mobileMenu = [...MEMBER_MOBILE_MENU];
    const isMobileWidth = false;
    beforeEach(() => {
        mockOpenNotifiations.mockReset();
        mockCloseNotifications.mockReset();
        mockClearNotifications.mockReset();
        mockHandleAction.mockReset();
        mockGetNotificationsMapForMenu.mockReset();
        mockUsePlanMonitoring.mockReset().mockReturnValue({ hasAccess: true });
        mockUseMediaQuery.mockReset().mockReturnValue(isMobileWidth);
        mockUseNotifications
            .mockReset()
            .mockReturnValue(mockUseNotificationsResult);
        mockUseFeatureFlags
            .mockReset()
            .mockReturnValue({ flags: { bannerContent: {} } });
    });

    it('renders children', () => {
        const testId = 'test-id';
        const { getByTestId } = renderWithTheme(
            <TopNavigationPage
                primaryMenu={primaryMenu}
                secondaryMenu={secondaryMenu}
                mobileMenu={mobileMenu}
                currentPath={primaryMenu[0].path}
                onNavigate={jest.fn()}
                user={mockUser}
                isLoadingUser={false}
            >
                <div data-testid={testId}>Test</div>
            </TopNavigationPage>
        );
        expect(getByTestId(testId)).toBeVisible();
    });

    it('renders banner message', () => {
        const message = 'Test banner message';
        mockUseFeatureFlags.mockReturnValueOnce({
            flags: {
                bannerContent: {
                    message,
                },
            },
        });
        const { getByText } = renderWithTheme(
            <TopNavigationPage
                primaryMenu={primaryMenu}
                secondaryMenu={secondaryMenu}
                mobileMenu={mobileMenu}
                currentPath={primaryMenu[0].path}
                onNavigate={jest.fn()}
                user={mockUser}
                isLoadingUser={false}
            />
        );
        expect(getByText(message)).toBeVisible();
    });
    describe('Top Navigation', () => {
        it('renders primary menu', () => {
            mockUsePlanMonitoring.mockReturnValueOnce({ hasAccess: true });
            const { getByText } = renderWithTheme(
                <TopNavigationPage
                    primaryMenu={primaryMenu}
                    secondaryMenu={secondaryMenu}
                    mobileMenu={mobileMenu}
                    currentPath={primaryMenu[0].path}
                    onNavigate={jest.fn()}
                    user={mockUser}
                    isLoadingUser={false}
                />
            );

            primaryMenu.forEach((link) => {
                expect(getByText(link.displayName)).toBeInTheDocument();
            });
        });

        it('does not render links when user does not have access', () => {
            mockUsePlanMonitoring.mockReturnValueOnce({ hasAccess: false });
            const { queryByText } = renderWithTheme(
                <TopNavigationPage
                    primaryMenu={primaryMenu}
                    secondaryMenu={secondaryMenu}
                    mobileMenu={mobileMenu}
                    currentPath={primaryMenu[0].path}
                    onNavigate={jest.fn()}
                    user={mockUser}
                    isLoadingUser={false}
                />
            );

            primaryMenu.forEach((link) => {
                expect(queryByText(link.displayName)).toBeNull();
            });
        });
        describe('Notifications', () => {
            const mockNotification: Notification.InApp.PersitedType = {
                id: '1',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString(),
                title: 'Test Notification',
                isViewed: false,
                action: {
                    type: 'navigate',
                    target: '/test',
                },
            };
            it('calls open notifications when notification icon is clicked', async () => {
                const { getByTestId } = renderWithTheme(
                    <TopNavigationPage
                        primaryMenu={primaryMenu}
                        secondaryMenu={secondaryMenu}
                        mobileMenu={mobileMenu}
                        currentPath={primaryMenu[0].path}
                        onNavigate={jest.fn()}
                        user={mockUser}
                        isLoadingUser={false}
                    />
                );
                const notificationIcon = getByTestId(
                    TOP_NAVIGATION_TEST_IDS.NOTIFICATIONS_ICON
                );
                await user.click(notificationIcon);
                expect(mockOpenNotifiations).toHaveBeenCalled();
            });
            it('closes notifications display when close icon is clicked', async () => {
                mockUseNotifications.mockReturnValueOnce({
                    ...mockUseNotificationsResult,
                    display: {
                        ...mockUseNotificationsResult.display,
                        isOpen: true,
                    },
                });
                const { getByTestId } = renderWithTheme(
                    <TopNavigationPage
                        primaryMenu={primaryMenu}
                        secondaryMenu={secondaryMenu}
                        mobileMenu={mobileMenu}
                        currentPath={primaryMenu[0].path}
                        onNavigate={jest.fn()}
                        user={mockUser}
                        isLoadingUser={false}
                    />
                );
                const closeIcon = getByTestId(
                    NOTIFICATION_DRAWER_TEST_IDS.CLOSE_BUTTON
                );
                await user.click(closeIcon);
                expect(mockCloseNotifications).toHaveBeenCalled();
            });

            it('handles notification action when clicked', async () => {
                mockUseNotifications.mockReturnValueOnce({
                    ...mockUseNotificationsResult,
                    display: {
                        ...mockUseNotificationsResult.display,
                        isOpen: true,
                    },
                    notifications: [mockNotification],
                });
                const { getByText } = renderWithTheme(
                    <TopNavigationPage
                        primaryMenu={primaryMenu}
                        secondaryMenu={secondaryMenu}
                        mobileMenu={mobileMenu}
                        currentPath={primaryMenu[0].path}
                        onNavigate={jest.fn()}
                        user={mockUser}
                        isLoadingUser={false}
                    />
                );
                const notification = getByText(mockNotification.title);
                await user.click(notification);
                expect(mockHandleAction).toHaveBeenCalledWith(mockNotification);
            });
            it('passes mobile menu to notifications map when user has access to app', () => {
                mockUsePlanMonitoring.mockReturnValueOnce({ hasAccess: true });
                renderWithTheme(
                    <TopNavigationPage
                        primaryMenu={primaryMenu}
                        secondaryMenu={secondaryMenu}
                        mobileMenu={mobileMenu}
                        currentPath={primaryMenu[0].path}
                        onNavigate={jest.fn()}
                        user={mockUser}
                        isLoadingUser={false}
                    />
                );
                expect(mockGetNotificationsMapForMenu).toHaveBeenCalledWith(
                    mobileMenu
                );
            });
            it('passes secondary menu to notifications map when user does not has access to app', () => {
                mockUsePlanMonitoring.mockReturnValueOnce({ hasAccess: false });
                renderWithTheme(
                    <TopNavigationPage
                        primaryMenu={primaryMenu}
                        secondaryMenu={secondaryMenu}
                        mobileMenu={mobileMenu}
                        currentPath={primaryMenu[0].path}
                        onNavigate={jest.fn()}
                        user={mockUser}
                        isLoadingUser={false}
                    />
                );
                expect(mockGetNotificationsMapForMenu).toHaveBeenCalledWith(
                    secondaryMenu
                );
            });
        });
        describe('Messages', () => {
            it('navigates to messages page when clicked', async () => {
                const mockOnNavigate = jest.fn();
                const { getByTestId } = renderWithTheme(
                    <TopNavigationPage
                        primaryMenu={primaryMenu}
                        secondaryMenu={secondaryMenu}
                        mobileMenu={mobileMenu}
                        currentPath={primaryMenu[0].path}
                        onNavigate={mockOnNavigate}
                        user={mockUser}
                        isLoadingUser={false}
                    />
                );

                const messagesIcon = getByTestId(
                    TOP_NAVIGATION_TEST_IDS.MESSAGES_ICON
                );
                await user.click(messagesIcon);
                expect(mockOnNavigate).toHaveBeenCalledWith(
                    URL_PATHS.MEMBERS.CHAT
                );
            });
        });
    });

    describe('Navigation Drawer', () => {
        it('renders mobile menu when user has access', async () => {
            mockUsePlanMonitoring.mockReturnValueOnce({ hasAccess: true });
            mockUseMediaQuery.mockReturnValueOnce(true);
            const { getByTestId } = renderWithTheme(
                <TopNavigationPage
                    primaryMenu={primaryMenu}
                    secondaryMenu={secondaryMenu}
                    mobileMenu={mobileMenu}
                    currentPath={primaryMenu[0].path}
                    onNavigate={jest.fn()}
                    user={mockUser}
                    isLoadingUser={false}
                />
            );
            const mobileMenuIcon = getByTestId(
                TOP_NAVIGATION_TEST_IDS.MOBILE_MENU_ICON
            );
            await user.click(mobileMenuIcon);
            const navigationDrawer = getByTestId(
                NAVIGATION_DRAWER_TEST_IDS.DRAWER
            );
            mobileMenu.forEach((link) => {
                const el = within(navigationDrawer).getByText(link.displayName);
                expect(el).toBeVisible();
            });
        });
        it('renders secondary menu when user doe not has access', async () => {
            mockUsePlanMonitoring.mockReturnValueOnce({ hasAccess: false });
            mockUseMediaQuery.mockReturnValueOnce(true);
            const { getByTestId } = renderWithTheme(
                <TopNavigationPage
                    primaryMenu={primaryMenu}
                    secondaryMenu={secondaryMenu}
                    mobileMenu={mobileMenu}
                    currentPath={primaryMenu[0].path}
                    onNavigate={jest.fn()}
                    user={mockUser}
                    isLoadingUser={false}
                />
            );
            const mobileMenuIcon = getByTestId(
                TOP_NAVIGATION_TEST_IDS.MOBILE_MENU_ICON
            );
            await user.click(mobileMenuIcon);
            const navigationDrawer = getByTestId(
                NAVIGATION_DRAWER_TEST_IDS.DRAWER
            );
            secondaryMenu.forEach((link) => {
                const el = within(navigationDrawer).getByText(link.displayName);
                expect(el).toBeVisible();
            });
        });
    });
});
