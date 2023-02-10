import userEvent from '@testing-library/user-event';

import { renderWithTheme } from '../../../../fixtures/renderWithTheme';
import { TEST_IDS as INPUT_TEST_IDS } from '../Input';
import { PasswordInput, TEST_IDS } from './index';

describe('Password Input', () => {
    const user = userEvent.setup();
    it('renders icon button when allowShowPassword is true', () => {
        const { getByTestId } = renderWithTheme(
            <PasswordInput id="test" allowShowPassword />
        );
        expect(getByTestId(TEST_IDS.BUTTON)).toBeInTheDocument();
    });

    it('does not renders icon button when allowShowPassword is false', () => {
        const { queryByTestId } = renderWithTheme(
            <PasswordInput id="test" allowShowPassword={false} />
        );
        expect(queryByTestId(TEST_IDS.BUTTON)).not.toBeInTheDocument();
    });

    it('defaults to hidden password', async () => {
        const { getByTestId } = renderWithTheme(
            <PasswordInput id="test" allowShowPassword />
        );
        expect(
            getByTestId(INPUT_TEST_IDS.INPUT).firstElementChild
        ).toHaveAttribute('type', 'password');
    });

    it('shows password when button is clicked', async () => {
        const password = 'secret password';
        const { getByTestId, getByRole } = renderWithTheme(
            <PasswordInput id="test" value={password} allowShowPassword />
        );
        const button = getByTestId(TEST_IDS.BUTTON);
        await user.click(button);
        expect(getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('correctly switches icons in show/hide button', async () => {
        const { queryByTestId } = renderWithTheme(
            <PasswordInput id="test" allowShowPassword />
        );
        const input = queryByTestId(INPUT_TEST_IDS.INPUT)?.firstElementChild;
        expect(input).toHaveAttribute('type', 'password');
        expect(queryByTestId(TEST_IDS.HIDDEN_ICON)).toBeInTheDocument();
        expect(queryByTestId(TEST_IDS.VISIBLE_ICON)).not.toBeInTheDocument();

        const button = queryByTestId(TEST_IDS.BUTTON);
        if (!button) return;
        await user.click(button);

        expect(input).toHaveAttribute('type', 'text');
        expect(queryByTestId(TEST_IDS.VISIBLE_ICON)).toBeInTheDocument();
        expect(queryByTestId(TEST_IDS.HIDDEN_ICON)).not.toBeInTheDocument();
    });
});
