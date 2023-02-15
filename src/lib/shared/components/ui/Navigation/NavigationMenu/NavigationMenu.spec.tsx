import { NavigationMenu, TEST_IDS } from './NavigationMenu';
import { renderWithTheme } from '@/lib/shared/components/fixtures';
import {
    NavigationLink,
    THERAPIST_MAIN_MENU,
    MEMBER_MAIN_MENU,
    NAVIGATION_ICON,
} from '@/lib/sitemap';
const mockMenu = [
    // This is a hack to get around the menu bein 1 item long for launch
    ...THERAPIST_MAIN_MENU,
    MEMBER_MAIN_MENU[1],
] as unknown as NavigationLink[];
describe('NavigationMenu', () => {
    it('should render list items', () => {
        const { getByText } = renderWithTheme(
            <NavigationMenu
                currentPath="/"
                menu={mockMenu}
                onItemClicked={jest.fn()}
            />
        );
        expect(getByText(mockMenu[0].displayName)).toBeVisible();
        expect(getByText(mockMenu[1].displayName)).toBeVisible();
    });

    it('should set tab translation', () => {
        const { getByTestId } = renderWithTheme(
            <NavigationMenu
                currentPath={mockMenu[1].path}
                menu={mockMenu}
                onItemClicked={jest.fn()}
            />
        );
        const tab = getByTestId(TEST_IDS.TAB);
        expect(tab).toHaveStyle('transform: translateY(68px)');
    });

    it('should render icon', () => {
        const { getByTestId } = renderWithTheme(
            <NavigationMenu
                currentPath="/"
                menu={[
                    {
                        ...mockMenu[0],
                        icon: NAVIGATION_ICON.HOME,
                    },
                ]}
                onItemClicked={jest.fn()}
            />
        );
        expect(getByTestId(NAVIGATION_ICON.HOME)).toBeVisible();
    });

    it('should render notification counter', () => {
        const { getByText } = renderWithTheme(
            <NavigationMenu
                currentPath="/"
                menu={[mockMenu[0]]}
                onItemClicked={jest.fn()}
                notificationMap={{ [mockMenu[0].path]: 2 }}
            />
        );
        expect(getByText(2)).toBeVisible();
    });
});
