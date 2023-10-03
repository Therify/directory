import { renderWithTheme } from '@/lib/shared/components/fixtures';
import { NavigationLink } from '@/lib/sitemap';
import { within } from '@testing-library/react';
import { TopNavigationBar, TEST_IDS } from './TopNavigationBar';
import { mockTopNavigationBarProps } from './TopNavigationBar.mocks';

const { primaryMenu, currentPath, ...mockProps } = mockTopNavigationBarProps;

describe('TopNavigationBar', function () {
    describe('Rendering desktop navigation links', () => {
        let desktopMenu: HTMLElement;
        beforeAll(() => {
            const { getByTestId } = renderWithTheme(
                <TopNavigationBar
                    currentPath="/"
                    primaryMenu={primaryMenu}
                    {...mockProps}
                />
            );
            desktopMenu = getByTestId(TEST_IDS.DESKTOP_MENU);
        });

        it.each(primaryMenu)(
            'finds link: $displayName',
            ({ displayName, path }) => {
                const link = within(desktopMenu).getByText(displayName);
                expect(link).toHaveAttribute('href', path);
            }
        );
    });

    it('only selects the active path', () => {
        const [selectedRoute, ...unselectedRoutes] = primaryMenu;
        const { theme, getByTestId } = renderWithTheme(
            <TopNavigationBar
                currentPath={selectedRoute.path}
                primaryMenu={primaryMenu}
                {...mockProps}
            />
        );
        const desktopMenu = getByTestId(TEST_IDS.DESKTOP_MENU);
        const selectedEl = within(desktopMenu).getByText(
            selectedRoute.displayName
        );
        const unselectedEls = unselectedRoutes.map(({ displayName }) =>
            within(desktopMenu).getByText(displayName)
        );

        expect(selectedEl).toHaveStyle(`color: ${theme.palette.text.primary}`);
        unselectedEls.forEach((el) =>
            expect(el).toHaveStyle(`color: ${theme.palette.grey[500]}`)
        );
    });

    it('selects the active path when nested paths start with the base path', () => {
        const baseRoute = {
            displayName: 'Nested Path',
            path: '/path',
        } as NavigationLink;
        const { theme, getByTestId } = renderWithTheme(
            <TopNavigationBar
                currentPath={`${baseRoute.path}/nested`}
                primaryMenu={[...primaryMenu, baseRoute]}
                {...mockProps}
            />
        );
        const desktopMenu = getByTestId(TEST_IDS.DESKTOP_MENU);
        const selectedEl = within(desktopMenu).getByText(baseRoute.displayName);
        expect(selectedEl).toHaveStyle(`color: ${theme.palette.text.primary}`);
    });

    it('does not render logout button when user is not present', () => {
        const { queryByText } = renderWithTheme(
            <TopNavigationBar
                currentPath="/"
                primaryMenu={primaryMenu}
                {...mockProps}
            />
        );
        const logoutButton = queryByText('Logout');
        expect(logoutButton).toBeNull();
    });
});
