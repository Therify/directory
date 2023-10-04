import { renderWithTheme } from '@/lib/shared/components/fixtures/renderWithTheme';
import { Mocks } from '@/lib/shared/types';
import { useInAppNotifications } from '@/lib/modules/notifications/components/hooks';
import { MemberExpiredPlanPage } from './MemberExpiredPlanPage';
import { format } from 'date-fns';
import { ReactNode } from 'react';

jest.mock('@/lib/modules/notifications/components/hooks', () => {
    return {
        useInAppNotifications: jest.fn(),
    };
});

jest.mock('next/router', () => {
    return {
        useRouter: () => ({ pathname: '/test', push: jest.fn() }),
    };
});

jest.mock('@/lib/modules/messaging/hooks', () => {
    return {
        useChatClient: () => ({
            ChatProvider: ({ children }: { children?: ReactNode }) => (
                <>{children}</>
            ),
            unreadChatMessagesCount: 0,
        }),
    };
});

describe('MemberExpiredPlanPage', () => {
    beforeAll(() => {
        (useInAppNotifications as jest.Mock).mockReturnValue({
            notifications: [],
            clearNotifications: jest.fn(),
            clearActionlessNotifications: jest.fn(),
            display: {
                isOpen: false,
                close: jest.fn(),
                open: jest.fn(),
            },
            unreadCount: 0,
            handleAction: jest.fn(),
            getNotificationsMapForMenu: () => ({}),
            getNotificationCountForPath: jest.fn(),
        });
    });

    const inactiveMessage =
        'Please contact the account administrator within your organization for further information about access to our services.';
    const expiredMessage =
        'Your sponsoring organization’s contract with Therify has expired. Please contact the account administrator within your organization for further information on future access to our services.';

    it('renders', () => {
        expect(
            renderWithTheme(
                <MemberExpiredPlanPage
                    user={Mocks.getTherifyUser({
                        type: 'member',
                    })}
                />
            )
        ).toBeDefined();
    });

    it('should render active message when not expired', () => {
        const user = Mocks.getTherifyUser({
            type: 'member',
            plan: 'active',
        });
        const { getByText } = renderWithTheme(
            <MemberExpiredPlanPage user={user} />
        );
        expect(
            getByText(
                `Your current plan access ends on ${format(
                    new Date(user.plan!.endDate),
                    'MMMM do, yyyy'
                )}.`
            )
        ).toBeVisible();
    });

    it('should render expired message when expired', () => {
        const user = Mocks.getTherifyUser({
            type: 'member',
            plan: 'expired',
        });
        const { getByText } = renderWithTheme(
            <MemberExpiredPlanPage user={user} />
        );
        expect(getByText(expiredMessage)).toBeVisible();
    });

    it('should render inactive message when plan not active', () => {
        const user = Mocks.getTherifyUser({
            type: 'member',
            plan: 'inactive',
        });
        const { getByText } = renderWithTheme(
            <MemberExpiredPlanPage user={user} />
        );
        expect(getByText(inactiveMessage)).toBeVisible();
        expect(getByText('Your plan status is not active.')).toBeVisible();
    });

    it('should not render invalid messages when plan is active', () => {
        const user = Mocks.getTherifyUser({
            type: 'member',
            plan: 'active',
        });
        const { queryByText } = renderWithTheme(
            <MemberExpiredPlanPage user={user} />
        );
        expect(queryByText(inactiveMessage)).toBeNull();
        expect(queryByText(expiredMessage)).toBeNull();
    });
});
