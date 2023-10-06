import { Box } from '@mui/material';
import { renderWithTheme } from '@/lib/shared/components/fixtures';
import { TEST_IDS as V3_SECONDARY_NAV_CONTROLS_TEST_IDS } from '@/lib/shared/components/ui/Navigation/v3/SecondaryNavigationControls/SecondaryNavigationControls';
import { TherifyUser } from '@/lib/shared/types';
import { Role } from '@prisma/client';
import { MemberNavigationPage } from './MemberNavigationPage';

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
    usePlanMonitoring: () => jest.fn().mockReturnValue({ hasAccess: true }),
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
        mockUseFeatureFlags
            .mockReset()
            .mockReturnValue({
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
    it('renders v2 top navigation when v3 flag is false', () => {
        mockUseFeatureFlags.mockReturnValue({
            flags: { bannerContent: {}, isV3DirectoryEnabled: false },
        });
        const { queryByTestId } = renderWithTheme(
            <MemberNavigationPage currentPath="/" user={mockUser} />
        );
        expect(
            queryByTestId(V3_SECONDARY_NAV_CONTROLS_TEST_IDS.MESSAGES_ICON)
        ).toBeNull();
    });
    it('renders v3 top navigation when v3 flag is true', () => {
        mockUseFeatureFlags.mockReturnValue({
            flags: { bannerContent: {}, isV3DirectoryEnabled: true },
        });
        const { getByTestId } = renderWithTheme(
            <MemberNavigationPage currentPath="/" user={mockUser} />
        );
        expect(
            getByTestId(V3_SECONDARY_NAV_CONTROLS_TEST_IDS.MESSAGES_ICON)
        ).toBeVisible();
    });
});
