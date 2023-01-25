import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavigationLink, TopNavigationBar } from './TopNavigationBar';
import { mockTopNavigationBarProps } from './TopNavigationBar.mocks';

const { navigationLinks } = mockTopNavigationBarProps.topNavigationBarProps;

describe('TopNavigationBar', function () {
    describe('Desktop Menu', () => {
        describe('Rendering desktop navigation links', () => {
            let desktopMenu: HTMLElement;
            beforeAll(() => {
                render(
                    <TopNavigationBar
                        currentPath="/"
                        navigationLinks={navigationLinks}
                    />
                );
                desktopMenu = screen.getByTestId('desktop-menu');
            });

            it.each(navigationLinks)(
                'finds link: $displayName',
                ({ displayName, path }) => {
                    const link = within(desktopMenu).getByText(displayName);
                    expect(link).toHaveAttribute('href', path);
                }
            );
        });

        it('only selects the active path', () => {
            const [selectedRoute, ...unselectedRoutes] = navigationLinks;
            render(
                <TopNavigationBar
                    currentPath={selectedRoute.path}
                    navigationLinks={navigationLinks}
                    user={{}}
                />
            );
            const desktopMenu = screen.getByTestId('desktop-menu');
            const selectedEl = within(desktopMenu).getByText(
                selectedRoute.displayName
            );
            const unselectedEls = unselectedRoutes.map(({ displayName }) =>
                within(desktopMenu).getByText(displayName)
            );

            expect(selectedEl).toHaveStyle('text-decoration: underline');
            unselectedEls.forEach((el) =>
                expect(el).toHaveStyle('text-decoration: none')
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
                    navigationLinks={[...navigationLinks, baseRoute]}
                    user={{}}
                />
            );
            const desktopMenu = screen.getByTestId('desktop-menu');
            const selectedEl = within(desktopMenu).getByText(
                baseRoute.displayName
            );

            expect(selectedEl).toHaveStyle('text-decoration: underline');
        });

        it('does not render logout button when user is not present', () => {
            render(
                <TopNavigationBar
                    currentPath="/"
                    navigationLinks={navigationLinks}
                />
            );
            const logoutButton = screen.queryByText('Logout');
            expect(logoutButton).toBeNull();
        });

        it('renders logout button user is present', async () => {
            render(
                <TopNavigationBar
                    currentPath="/"
                    navigationLinks={navigationLinks}
                    user={{}}
                />
            );
            const desktopMenu = screen.getByTestId('desktop-menu');
            const logoutButton = within(desktopMenu).getByText('Logout');
            expect(logoutButton).toBeInTheDocument();
            expect(logoutButton).toHaveAttribute('href', '/api/auth/logout');
        });
    });

    describe('Mobile Menu', () => {
        describe('Rendering mobile navigation links', () => {
            let mobileMenu: HTMLElement;
            beforeAll(async () => {
                const user = userEvent.setup();
                render(
                    <TopNavigationBar
                        currentPath="/"
                        navigationLinks={navigationLinks}
                    />
                );
                const menuButton =
                    screen.getByTestId('mobile-menu').firstElementChild!;
                await user.click(menuButton);
                mobileMenu = screen.getByTestId('mobile-menu-links');
            });

            it.each(navigationLinks)(
                'finds link: $displayName',
                ({ displayName, path }) => {
                    const link = within(mobileMenu).getByText(displayName);
                    expect(link).toHaveAttribute('href', path);
                }
            );
        });

        it('does not render logout menu item when user is not present', async () => {
            const user = userEvent.setup();
            render(
                <TopNavigationBar
                    currentPath="/"
                    navigationLinks={navigationLinks}
                />
            );
            const menuButton =
                screen.getByTestId('mobile-menu').firstElementChild!;
            await user.click(menuButton);
            const mobileMenu = screen.getByTestId('mobile-menu-links');
            const logoutButton = within(mobileMenu).queryByText('Logout');
            expect(logoutButton).toBeNull();
        });

        it('renders logout menu item user is present', async () => {
            const user = userEvent.setup();
            render(
                <TopNavigationBar
                    currentPath="/"
                    navigationLinks={navigationLinks}
                    user={{}}
                />
            );
            const menuButton =
                screen.getByTestId('mobile-menu').firstElementChild!;
            await user.click(menuButton);
            const mobileMenu = screen.getByTestId('mobile-menu-links');
            const logoutButton = within(mobileMenu).getByText('Logout');
            expect(logoutButton).toBeInTheDocument();
            expect(logoutButton).toHaveAttribute('href', '/api/auth/logout');
        });
    });
});
