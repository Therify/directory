import { renderWithTheme } from '@/lib/shared/components/fixtures';
import { Notification, TherifyUser } from '@/lib/shared/types';
import {
    MEMBER_MAIN_MENU,
    MEMBER_SECONDARY_MENU,
    MEMBER_MOBILE_MENU,
} from '@/lib/sitemap';
import { Role } from '@prisma/client';
import { TopNavigationPage } from './TopNavigationPage';

const mockUseFeatureFlags = jest.fn();
const mockUsePlanMonitoring = jest.fn();
jest.mock('@/lib/shared/hooks/', () => ({
    usePlanMonitoring: (args: unknown) => mockUsePlanMonitoring(args),
    useFeatureFlags: (args: unknown) => mockUseFeatureFlags(args),
}));
const mockOpenNotifiations = jest.fn();
const mockCloseNotifications = jest.fn();
const mockClearNotifications = jest.fn();
const mockHandleAction = jest.fn();
const mockGetNotificationsMapForMenu = jest.fn();
let isDisplayOpen = false;
jest.mock('@/lib/modules/notifications/components/hooks', () => ({
    useInAppNotifications: () => ({
        display: {
            isOpen: isDisplayOpen,
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
    }),
}));

const mockUser = {
    id: '123',
    email: 'test@therify.co',
    givenName: 'Test',
    roles: [Role.member],
} as unknown as TherifyUser.TherifyUser;

describe('TopNavigationPage', () => {
    const primaryMenu = [...MEMBER_MAIN_MENU];
    const secondaryMenu = [...MEMBER_SECONDARY_MENU];
    const mobileMenu = [...MEMBER_MOBILE_MENU];

    beforeEach(() => {
        isDisplayOpen = false;
        mockOpenNotifiations.mockReset();
        mockCloseNotifications.mockReset();
        mockClearNotifications.mockReset();
        mockHandleAction.mockReset();
        mockGetNotificationsMapForMenu.mockReset();
        mockUsePlanMonitoring.mockReset().mockReturnValue({ hasAccess: true });
        mockUseFeatureFlags
            .mockReset()
            .mockReturnValue({ flags: { bannerContent: {} } });
    });

    it('renders banner message', () => {
        const message = 'Test banner message';
        mockUseFeatureFlags.mockReturnValue({
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
        it.skip('renders menus', () => {
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
                expect(getByText(link.displayName)).toBeVisible();
            });
        });

        it.todo('does not render links when user does not have access');
    });
    describe('Notifications', () => {
        it('calls open notifications when notification icon is clicked', () => {});
        it.todo('closes notifications display when close icon is clicked');
        it.todo('clears notifications when clear button is clicked');
        it.todo('handles notification action when clicked');
        it.todo(
            'passes correct menu to notifications map based on user access to app'
        );
    });
});
