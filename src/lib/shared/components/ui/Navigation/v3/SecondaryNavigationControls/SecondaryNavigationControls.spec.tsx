import { renderWithTheme } from '@/lib/shared/components/fixtures';
import { TherifyUser } from '@/lib/shared/types';
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
            expect(getByTestId(TEST_IDS.MESSAGES_ICON)).toBeVisible();
            expect(getByTestId(TEST_IDS.MESSAGES_ICON)).toHaveTextContent('1');
        });
    });
});
