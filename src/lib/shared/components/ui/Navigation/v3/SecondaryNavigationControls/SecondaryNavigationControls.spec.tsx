import { renderWithTheme } from '@/lib/shared/components/fixtures';
import { TherifyUser } from '@/lib/shared/types';
import { NavigationLink } from '@/lib/sitemap';
import userEvent from '@testing-library/user-event';
import {
    SecondaryNavigationControls,
    TEST_IDS,
} from './SecondaryNavigationControls';

const mockUser = {
    emailAddress: 'test@therify.co',
    givenName: 'John',
    surname: 'Doe',
} as TherifyUser.TherifyUser;

describe('SecondaryNavigationControls', () => {
    const user = userEvent.setup();
    it('does not render when no user', () => {
        const { container } = renderWithTheme(
            <SecondaryNavigationControls
                isMobileWidth={false}
                toggleMobileMenu={() => {}}
                currentPath={'/'}
                menu={[]}
                onNavigate={() => {}}
                isLoadingUser={false}
                user={undefined}
            />
        );
        expect(container.childElementCount).toBe(0);
    });

    it('renders loader loading user', () => {
        const { getByTestId } = renderWithTheme(
            <SecondaryNavigationControls
                isMobileWidth={false}
                toggleMobileMenu={() => {}}
                currentPath={'/'}
                menu={[]}
                onNavigate={() => {}}
                isLoadingUser
                user={mockUser}
            />
        );
        expect(getByTestId(TEST_IDS.LOADER)).toBeVisible();
    });
    describe('messages', () => {
        it('renders the messages icon', () => {
            const { getByTestId } = renderWithTheme(
                <SecondaryNavigationControls
                    isMobileWidth={false}
                    toggleMobileMenu={() => {}}
                    currentPath={'/'}
                    menu={[]}
                    onNavigate={() => {}}
                    isLoadingUser={false}
                    user={mockUser}
                />
            );
            expect(getByTestId(TEST_IDS.MESSAGES_ICON)).toBeVisible();
        });
        it('indicates unread messages', () => {
            const { getByTestId } = renderWithTheme(
                <SecondaryNavigationControls
                    isMobileWidth={false}
                    toggleMobileMenu={() => {}}
                    currentPath={'/'}
                    menu={[]}
                    onNavigate={() => {}}
                    isLoadingUser={false}
                    user={mockUser}
                    unreadMessagesCount={1}
                />
            );
            const messagesIcon = getByTestId(TEST_IDS.MESSAGES_ICON);
            const badge = messagesIcon.firstElementChild?.lastElementChild;
            expect(badge).toBeVisible();
            expect(badge).not.toHaveClass('MuiBadge-invisible');
        });
        it('does not show badge when no unread messages', () => {
            const { getByTestId } = renderWithTheme(
                <SecondaryNavigationControls
                    isMobileWidth={false}
                    toggleMobileMenu={() => {}}
                    currentPath={'/'}
                    menu={[]}
                    onNavigate={() => {}}
                    isLoadingUser={false}
                    user={mockUser}
                    unreadMessagesCount={0}
                />
            );
            const messagesIcon = getByTestId(TEST_IDS.MESSAGES_ICON);
            const badge = messagesIcon.firstElementChild?.lastElementChild;
            expect(badge).toHaveClass('MuiBadge-invisible');
        });

        it('calls the click handler when clicked', async () => {
            const mockOnClick = jest.fn();
            const { getByTestId } = renderWithTheme(
                <SecondaryNavigationControls
                    isMobileWidth={false}
                    toggleMobileMenu={() => {}}
                    currentPath={'/'}
                    menu={[]}
                    onNavigate={() => {}}
                    isLoadingUser={false}
                    user={mockUser}
                    unreadMessagesCount={0}
                    onMessagesClick={mockOnClick}
                />
            );
            const messagesIcon = getByTestId(TEST_IDS.MESSAGES_ICON);
            await user.click(messagesIcon);
            expect(mockOnClick).toHaveBeenCalled();
        });

        it('does not render when viewed on mobile', () => {
            const { queryByTestId } = renderWithTheme(
                <SecondaryNavigationControls
                    isMobileWidth
                    toggleMobileMenu={() => {}}
                    currentPath={'/'}
                    menu={[]}
                    onNavigate={() => {}}
                    isLoadingUser={false}
                    user={mockUser}
                    unreadMessagesCount={0}
                />
            );
            const messagesIcon = queryByTestId(TEST_IDS.MESSAGES_ICON);
            expect(messagesIcon).toBeNull();
        });
    });

    describe('notifications', () => {
        it('renders the notifications icon', () => {
            const { getByTestId } = renderWithTheme(
                <SecondaryNavigationControls
                    isMobileWidth={false}
                    toggleMobileMenu={() => {}}
                    currentPath={'/'}
                    menu={[]}
                    onNavigate={() => {}}
                    isLoadingUser={false}
                    user={mockUser}
                />
            );
            expect(getByTestId(TEST_IDS.NOTIFICATIONS_ICON)).toBeVisible();
        });
        it('indicates new notifications', () => {
            const { getByTestId } = renderWithTheme(
                <SecondaryNavigationControls
                    isMobileWidth={false}
                    toggleMobileMenu={() => {}}
                    currentPath={'/'}
                    menu={[]}
                    onNavigate={() => {}}
                    isLoadingUser={false}
                    user={mockUser}
                    notificationCount={1}
                />
            );
            const notificationsIcon = getByTestId(TEST_IDS.NOTIFICATIONS_ICON);
            const badge = notificationsIcon.firstElementChild?.lastElementChild;
            expect(badge).toBeVisible();
            expect(badge).not.toHaveClass('MuiBadge-invisible');
        });
        it('does not show badge when no new notifications', () => {
            const { getByTestId } = renderWithTheme(
                <SecondaryNavigationControls
                    isMobileWidth={false}
                    toggleMobileMenu={() => {}}
                    currentPath={'/'}
                    menu={[]}
                    onNavigate={() => {}}
                    isLoadingUser={false}
                    user={mockUser}
                    notificationCount={0}
                />
            );
            const notificationsIcon = getByTestId(TEST_IDS.NOTIFICATIONS_ICON);
            const badge = notificationsIcon.firstElementChild?.lastElementChild;
            expect(badge).toHaveClass('MuiBadge-invisible');
        });
        it('calls click handler when clicked', async () => {
            const mockOnClick = jest.fn();
            const { getByTestId } = renderWithTheme(
                <SecondaryNavigationControls
                    isMobileWidth={false}
                    toggleMobileMenu={() => {}}
                    currentPath={'/'}
                    menu={[]}
                    onNavigate={() => {}}
                    isLoadingUser={false}
                    user={mockUser}
                    onNotificationsClick={mockOnClick}
                />
            );
            const notificationsIcon = getByTestId(TEST_IDS.NOTIFICATIONS_ICON);
            await user.click(notificationsIcon);
            expect(mockOnClick).toHaveBeenCalled();
        });
    });

    describe('Secondary menu', () => {
        const mockSecondaryLinks: NavigationLink[] = [
            { displayName: 'Settings', path: '/settings' },
            { displayName: 'Billing', path: '/billing' },
        ];

        it('renders the secondary menu', () => {
            const { getByTestId } = renderWithTheme(
                <SecondaryNavigationControls
                    isMobileWidth={false}
                    toggleMobileMenu={() => {}}
                    currentPath={'/'}
                    menu={mockSecondaryLinks}
                    onNavigate={() => {}}
                    isLoadingUser={false}
                    user={mockUser}
                />
            );
            expect(getByTestId(TEST_IDS.SECONDARY_MENU)).toBeVisible();
        });

        it('renders secondary menu links', async () => {
            const { getByTestId, getByText } = renderWithTheme(
                <SecondaryNavigationControls
                    isMobileWidth={false}
                    toggleMobileMenu={() => {}}
                    currentPath={'/'}
                    menu={mockSecondaryLinks}
                    onNavigate={() => {}}
                    isLoadingUser={false}
                    user={mockUser}
                />
            );

            const secondaryMenu = getByTestId(TEST_IDS.SECONDARY_MENU);
            await user.click(secondaryMenu.firstElementChild!);
            mockSecondaryLinks.forEach((link) => {
                expect(getByText(link.displayName)).toBeVisible();
            });
        });

        it('navigates to secondary menu link path', async () => {
            const mockOnNavigate = jest.fn();
            const { getByTestId, getByText } = renderWithTheme(
                <SecondaryNavigationControls
                    isMobileWidth={false}
                    toggleMobileMenu={() => {}}
                    currentPath={'/'}
                    menu={mockSecondaryLinks}
                    onNavigate={mockOnNavigate}
                    isLoadingUser={false}
                    user={mockUser}
                />
            );

            const secondaryMenu = getByTestId(TEST_IDS.SECONDARY_MENU);
            await user.click(secondaryMenu.firstElementChild!);
            const link = mockSecondaryLinks[0];
            await user.click(getByText(link.displayName));
            expect(mockOnNavigate).toHaveBeenCalledWith(link.path);
        });
    });

    describe('mobile menu', () => {
        it('renders the menu icon when viewed on mobile', () => {
            const { getByTestId } = renderWithTheme(
                <SecondaryNavigationControls
                    isMobileWidth
                    toggleMobileMenu={() => {}}
                    currentPath={'/'}
                    menu={[]}
                    onNavigate={() => {}}
                    isLoadingUser={false}
                    user={mockUser}
                />
            );
            expect(getByTestId(TEST_IDS.MOBILE_MENU_ICON)).toBeVisible();
        });
        it('does not render the menu icon when viewed on desktop', () => {
            const { queryByTestId } = renderWithTheme(
                <SecondaryNavigationControls
                    isMobileWidth={false}
                    toggleMobileMenu={() => {}}
                    currentPath={'/'}
                    menu={[]}
                    onNavigate={() => {}}
                    isLoadingUser={false}
                    user={mockUser}
                />
            );
            expect(queryByTestId(TEST_IDS.MOBILE_MENU_ICON)).toBeNull();
        });
        it('calls the toggleMobileMenu handler when clicked', async () => {
            const mockToggleMobileMenu = jest.fn();
            const { getByTestId } = renderWithTheme(
                <SecondaryNavigationControls
                    isMobileWidth
                    toggleMobileMenu={mockToggleMobileMenu}
                    currentPath={'/'}
                    menu={[]}
                    onNavigate={() => {}}
                    isLoadingUser={false}
                    user={mockUser}
                />
            );

            const secondaryMenu = getByTestId(TEST_IDS.MOBILE_MENU_ICON);
            await user.click(secondaryMenu);
            expect(mockToggleMobileMenu).toHaveBeenCalled();
        });
    });
});
