import { render } from '@testing-library/react';

import { SideNavigationLayout } from './index';

describe('SideNavigationLayout', () => {
    it('renders topbar content', () => {
        const { getByText } = render(
            <SideNavigationLayout
                topbar={<div>Topbar</div>}
                navigation={<div />}
            ></SideNavigationLayout>
        );
        expect(getByText('Topbar')).toBeVisible();
    });

    it('renders navigation content', () => {
        const { getByText } = render(
            <SideNavigationLayout
                topbar={<div />}
                navigation={<div>Navigation</div>}
            ></SideNavigationLayout>
        );
        expect(getByText('Navigation')).not.toBeVisible();
    });

    it('renders children content', () => {
        const { getByText } = render(
            <SideNavigationLayout navigation={<div />} topbar={<div />}>
                Content goes here!
            </SideNavigationLayout>
        );
        expect(getByText('Content goes here!')).toBeInTheDocument();
    });
});
