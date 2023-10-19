import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '@/lib/shared/components/fixtures';
import { BillingView } from './BillingView';

describe('BillingView', () => {
    const user = userEvent.setup();
    it('launches Stripe portal', async () => {
        const launchStripePortal = jest.fn();
        const { getByText } = renderWithTheme(
            <BillingView launchStripePortal={launchStripePortal} />
        );

        await user.click(getByText('Launch Stripe customer portal'));
        expect(launchStripePortal).toHaveBeenCalled();
    });
});
