import { Box } from '@mui/material';
import { renderWithTheme } from '@/lib/shared/components/fixtures';
import { TherifyUser } from '@/lib/shared/types';
import { Role } from '@prisma/client';
import { MemberNavigationPage } from './MemberNavigationPage';
import {
    MEMBER_MAIN_MENU as MEMBER_MAIN_MENU_V2,
    MEMBER_MAIN_MENU_V3,
    MEMBER_NAVIGATION_LINKS,
} from '@/lib/sitemap';

const mockUseFeatureFlags = jest.fn();
const mockUseChatClient = jest.fn();
jest.mock('next/router', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));
jest.mock('@/lib/modules/messaging/hooks', () => ({
    useChatClient: (args: unknown) => mockUseChatClient(args),
}));
jest.mock('@/lib/shared/hooks/', () => ({
    usePlanMonitoring: () => ({ hasAccess: true }),
    useFeatureFlags: (args: unknown) => mockUseFeatureFlags(args),
}));

const mockUseNotificationsResult = {
    display: {
        isOpen: false,
        open: jest.fn,
        close: jest.fn,
    },
    notifications: [],
    unreadCount: 0,
    clearActionlessNotifications: jest.fn,
    handleAction: jest.fn,
    getNotificationsMapForMenu: jest.fn,
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
    hasChatEnabled: false,
} as unknown as TherifyUser.TherifyUser;

describe('MemberNavigationPage', () => {
    beforeEach(() => {
        mockUseNotifications
            .mockReset()
            .mockReturnValue(mockUseNotificationsResult);
        mockUseFeatureFlags.mockReset().mockReturnValue({
            flags: { bannerContent: {}, isV3DirectoryEnabled: false },
        });
        mockUseChatClient.mockReset().mockReturnValue({
            ChatProvider: Box,
            unreadChatMessagesCount: 0,
        });
    });
    it('passes user to useChatClient', () => {
        renderWithTheme(
            <MemberNavigationPage currentPath="/" user={mockUser} />
        );
        expect(mockUseChatClient).toHaveBeenCalledWith(mockUser);
    });
    describe('v2', () => {
        it('renders v2 top navigation when v3 flag is false', () => {
            mockUseFeatureFlags.mockReturnValue({
                flags: { bannerContent: {}, isV3DirectoryEnabled: false },
            });
            const { getByText } = renderWithTheme(
                <MemberNavigationPage currentPath="/" user={mockUser} />
            );
            MEMBER_MAIN_MENU_V2.forEach((menuItem) => {
                expect(getByText(menuItem.displayName)).toBeInTheDocument();
            });
        });
        it('renders chat link when chat enabled', () => {
            mockUseFeatureFlags.mockReturnValue({
                flags: { bannerContent: {}, isV3DirectoryEnabled: false },
            });
            const { getByText } = renderWithTheme(
                <MemberNavigationPage
                    currentPath="/"
                    user={{ ...mockUser, hasChatEnabled: true }}
                />
            );
            MEMBER_MAIN_MENU_V2.forEach((menuItem) => {
                expect(getByText(menuItem.displayName)).toBeInTheDocument();
            });
            expect(
                getByText(MEMBER_NAVIGATION_LINKS.CHAT.displayName)
            ).toBeInTheDocument();
        });
        it('does not render chat link when chat is not enabled', () => {
            mockUseFeatureFlags.mockReturnValue({
                flags: { bannerContent: {}, isV3DirectoryEnabled: false },
            });
            const { queryByText } = renderWithTheme(
                <MemberNavigationPage
                    currentPath="/"
                    user={{ ...mockUser, hasChatEnabled: false }}
                />
            );
            expect(
                queryByText(MEMBER_NAVIGATION_LINKS.CHAT.displayName)
            ).not.toBeInTheDocument();
        });
    });
    describe('v3', () => {
        it('renders v3 top navigation when v3 flag is true', () => {
            mockUseFeatureFlags.mockReturnValue({
                flags: { bannerContent: {}, isV3DirectoryEnabled: true },
            });
            const { getByText } = renderWithTheme(
                <MemberNavigationPage currentPath="/" user={mockUser} />
            );
            MEMBER_MAIN_MENU_V3.forEach((menuItem) => {
                expect(getByText(menuItem.displayName)).toBeInTheDocument();
            });
        });
    });
});
