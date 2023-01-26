import { NavigationLink } from '@/lib/sitemap';
import { render, screen, within } from '@testing-library/react';
import { TopNavigationBar, TEST_IDS } from './TopNavigationBar';
import { mockTopNavigationBarProps } from './TopNavigationBar.mocks';

const { primaryMenu, currentPath, ...mockProps } = mockTopNavigationBarProps;

describe('TopNavigationBar', function () {
    describe('Desktop Menu', () => {
        describe('Rendering desktop navigation links', () => {
            let desktopMenu: HTMLElement;
            beforeAll(() => {
                render(
                    <TopNavigationBar
                        currentPath="/"
                        primaryMenu={primaryMenu}
                        {...mockProps}
                    />
                );
                desktopMenu = screen.getByTestId(TEST_IDS.DESKTOP_MENU);
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
            render(
                <TopNavigationBar
                    currentPath={selectedRoute.path}
                    primaryMenu={primaryMenu}
                    {...mockProps}
                />
            );
            const desktopMenu = screen.getByTestId(TEST_IDS.DESKTOP_MENU);
            const selectedEl = within(desktopMenu).getByText(
                selectedRoute.displayName
            );
            const unselectedEls = unselectedRoutes.map(({ displayName }) =>
                within(desktopMenu).getByText(displayName)
            );

            expect(
                within(selectedEl).getByTestId(TEST_IDS.ACTIVE_TAB)
            ).toBeInTheDocument();
            unselectedEls.forEach((el) =>
                expect(within(el).queryByTestId(TEST_IDS.ACTIVE_TAB)).toBeNull()
            );
        });

        it('selects the active path when nested paths start with the base path', () => {
            const baseRoute = {
                displayName: 'Nested Path',
                path: '/path',
            } as NavigationLink;
            render(
                <TopNavigationBar
                    currentPath={`${baseRoute.path}/nested`}
                    primaryMenu={[...primaryMenu, baseRoute]}
                    {...mockProps}
                />
            );
            const desktopMenu = screen.getByTestId(TEST_IDS.DESKTOP_MENU);
            const selectedEl = within(desktopMenu).getByText(
                baseRoute.displayName
            );
            const tabEl = within(selectedEl).getByTestId(TEST_IDS.ACTIVE_TAB);

            expect(tabEl).toBeInTheDocument();
        });

        it('does not render logout button when user is not present', () => {
            render(
                <TopNavigationBar
                    currentPath="/"
                    primaryMenu={primaryMenu}
                    {...mockProps}
                />
            );
            const logoutButton = screen.queryByText('Logout');
            expect(logoutButton).toBeNull();
        });
    });
});
