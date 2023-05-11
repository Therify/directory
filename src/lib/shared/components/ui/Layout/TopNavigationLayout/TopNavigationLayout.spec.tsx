import { render } from '@testing-library/react';
import { TopNavigationLayout } from './index';

describe('TopNavigationLayout', () => {
    it('renders navigation content', () => {
        const { getByText } = render(
            <TopNavigationLayout
                navigationSlot={<div>Navigation</div>}
            ></TopNavigationLayout>
        );
        expect(getByText('Navigation')).toBeInTheDocument();
    });

    it('renders banner content', () => {
        const { getByText } = render(
            <TopNavigationLayout
                bannerSlot={<div>Banner</div>}
                navigationSlot={<div>Navigation</div>}
            ></TopNavigationLayout>
        );
        expect(getByText('Banner')).toBeInTheDocument();
    });

    it('renders children content', () => {
        const { getByText } = render(
            <TopNavigationLayout navigationSlot={<div>Navigation</div>}>
                Content goes here!
            </TopNavigationLayout>
        );
        expect(getByText('Content goes here!')).toBeInTheDocument();
    });
});
