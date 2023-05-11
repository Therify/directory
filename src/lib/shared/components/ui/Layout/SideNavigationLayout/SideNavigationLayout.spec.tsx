import { render } from '@testing-library/react';

import { SideNavigationLayout } from './index';

describe('SideNavigationLayout', () => {
    it('renders topbar content', () => {
        const { getByText } = render(
            <SideNavigationLayout
                topbarSlot={<div>Topbar</div>}
                navigationSlot={<div />}
            ></SideNavigationLayout>
        );
        expect(getByText('Topbar')).toBeVisible();
    });

    it('renders banner content', () => {
        const { getByText } = render(
            <SideNavigationLayout
                bannerSlot={<div>Banner</div>}
                topbarSlot={<div>Topbar</div>}
                navigationSlot={<div />}
            ></SideNavigationLayout>
        );
        expect(getByText('Banner')).toBeVisible();
    });

    it('renders navigation content', () => {
        const { getByText } = render(
            <SideNavigationLayout
                topbarSlot={<div />}
                navigationSlot={<div>Navigation</div>}
            ></SideNavigationLayout>
        );
        expect(getByText('Navigation')).toBeInTheDocument();
    });

    it('renders children content', () => {
        const { getByText } = render(
            <SideNavigationLayout navigationSlot={<div />} topbarSlot={<div />}>
                Content goes here!
            </SideNavigationLayout>
        );
        expect(getByText('Content goes here!')).toBeInTheDocument();
    });
});
