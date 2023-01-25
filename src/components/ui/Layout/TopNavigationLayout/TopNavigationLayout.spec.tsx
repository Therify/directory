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

    it('renders children content', () => {
        const { getByText } = render(
            <TopNavigationLayout navigationSlot={<div>Navigation</div>}>
                Content goes here!
            </TopNavigationLayout>
        );
        expect(getByText('Content goes here!')).toBeInTheDocument();
    });
});
