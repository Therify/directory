import { render } from '@testing-library/react';
import { TopNavWebPage } from './index';

describe('TopNavWebPage', () => {
    it('renders navigation content', () => {
        const { getByText } = render(
            <TopNavWebPage
                navigationSlot={<div>Navigation</div>}
            ></TopNavWebPage>
        );
        expect(getByText('Navigation')).toBeInTheDocument();
    });

    it('renders children content', () => {
        const { getByText } = render(
            <TopNavWebPage navigationSlot={<div>Navigation</div>}>
                Content goes here!
            </TopNavWebPage>
        );
        expect(getByText('Content goes here!')).toBeInTheDocument();
    });
});
