import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../../fixtures/renderWithTheme';
import { Input, TEST_IDS } from './Input';

describe('Input', () => {
    it('handles input changes', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        const { getByRole } = renderWithTheme(
            <Input id="test" onChange={onChange} />
        );
        const input = getByRole('textbox');
        await user.type(input, 'Hello');
        expect(onChange).toHaveBeenCalledTimes(5);
    });

    it('passes value to the input', () => {
        const { getByRole } = renderWithTheme(
            <Input id="test" value="Hello" />
        );
        const input = getByRole('textbox');
        expect(input).toHaveValue('Hello');
    });

    it('passes placeholder to the input', () => {
        const { getByRole } = renderWithTheme(
            <Input id="test" placeholder="Hello" />
        );
        const input = getByRole('textbox');
        expect(input).toHaveAttribute('placeholder', 'Hello');
    });

    it('disables', () => {
        const { getByRole } = renderWithTheme(<Input id="test" disabled />);
        const input = getByRole('textbox');
        expect(input).toBeDisabled();
    });

    describe('Label', () => {
        it('renders label', () => {
            const { getByText } = renderWithTheme(
                <Input id="test" label="Hello" />
            );
            expect(getByText('Hello')).toBeInTheDocument();
        });

        it('does not render label when not provided', () => {
            const { queryByTestId } = renderWithTheme(<Input id="test" />);
            expect(queryByTestId(TEST_IDS.LABEL)).not.toBeInTheDocument();
        });

        it('renders label with required *', () => {
            const { getByText } = renderWithTheme(
                <Input id="test" label="Hello" required />
            );
            expect(getByText('Hello')).toHaveTextContent('Hello *');
        });
    });

    describe('Helper Text', () => {
        it('does not render helper text when not provided', () => {
            const { queryByTestId } = renderWithTheme(<Input id="test" />);
            expect(queryByTestId(TEST_IDS.HELPER_TEXT)).not.toBeInTheDocument();
        });

        it('renders error text as highest priority', () => {
            const { queryByText } = renderWithTheme(
                <Input
                    id="test"
                    errorMessage="Error"
                    successMessage="Success"
                    helperText="Helper"
                />
            );
            expect(queryByText('Error')).toBeInTheDocument();
            expect(queryByText('Success')).not.toBeInTheDocument();
            expect(queryByText('Helper')).not.toBeInTheDocument();
        });

        it('renders success text as second highest priority', () => {
            const { queryByText } = renderWithTheme(
                <Input id="test" successMessage="Success" helperText="Helper" />
            );
            expect(queryByText('Success')).toBeInTheDocument();
            expect(queryByText('Helper')).not.toBeInTheDocument();
        });

        it('renders helper text as lowest priority', () => {
            const { getByText } = renderWithTheme(
                <Input id="test" helperText="Helper" />
            );
            expect(getByText('Helper')).toBeInTheDocument();
        });
    });

    describe('Error State', () => {
        it('renders error state', () => {
            const { getByText, getByTestId, theme } = renderWithTheme(
                <Input id="test" errorMessage="Hello" />
            );
            expect(getByText('Hello')).toBeInTheDocument();
            expect(getByTestId(TEST_IDS.INPUT)).toHaveStyle(
                `border-color: ${theme.palette.error.main}`
            );
        });

        it('does not render error state when not provided', () => {
            const { queryByTestId } = renderWithTheme(<Input id="test" />);
            expect(queryByTestId(TEST_IDS.HELPER_TEXT)).not.toBeInTheDocument();
        });
    });

    describe('Success State', () => {
        it('renders success state', () => {
            const { getByText, getByTestId, theme } = renderWithTheme(
                <Input id="test" successMessage="Hello" />
            );
            expect(getByText('Hello')).toBeInTheDocument();
            expect(getByTestId(TEST_IDS.INPUT)).toHaveStyle(
                `border-color: ${theme.palette.success.main}`
            );
        });

        it('does not render success state when not provided', () => {
            const { queryByTestId } = renderWithTheme(<Input id="test" />);
            expect(queryByTestId(TEST_IDS.HELPER_TEXT)).not.toBeInTheDocument();
        });
    });
});
