import userEvent from '@testing-library/user-event';

import { renderWithTheme } from '../../../fixtures/renderWithTheme';
import { DatePicker, TEST_IDS } from './DatePicker';

describe('DatePicker', () => {
    it('handles input changes', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        const { getByRole } = renderWithTheme(
            <DatePicker value={null} onChange={onChange} />
        );
        const pickerInput = getByRole('textbox');
        await user.type(pickerInput, '1');
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('passes value to the input', () => {
        const date = new Date();
        const { getByRole } = renderWithTheme(
            <DatePicker value={date} onChange={jest.fn()} />
        );
        const input = getByRole('textbox');
        expect(input).toHaveValue(
            date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            })
        );
    });

    it('disables', () => {
        const { getByRole } = renderWithTheme(
            <DatePicker disabled value={null} onChange={jest.fn()} />
        );
        const input = getByRole('textbox');
        expect(input).toBeDisabled();
    });

    describe('mobile vs desktop', () => {
        it('renders desktop picker by default', () => {
            const { getByRole } = renderWithTheme(
                <DatePicker value={null} onChange={jest.fn()} />
            );
            const input = getByRole('textbox');
            // The desktop picker has a button to launch the calendar view next to the input
            expect(input.nextSibling?.firstChild?.nodeName).toBe('BUTTON');
        });
        it('renders mobile picker', () => {
            const { getByRole } = renderWithTheme(
                <DatePicker mobile value={null} onChange={jest.fn()} />
            );
            const input = getByRole('textbox');
            expect(input.nextSibling?.firstChild?.nodeName).not.toBe('BUTTON');
        });
    });

    describe('Label', () => {
        it('renders label', () => {
            const label = 'Hello World';
            const { getByLabelText } = renderWithTheme(
                <DatePicker label={label} value={null} onChange={jest.fn()} />
            );
            expect(getByLabelText(label)).toBeVisible();
        });

        it('renders with required "*"', () => {
            const label = 'Hello World';
            const { getAllByTestId } = renderWithTheme(
                <DatePicker
                    label={label}
                    required
                    value={null}
                    onChange={jest.fn()}
                />
            );
            // Renders in label and in a fieldset legend
            expect(getAllByTestId(TEST_IDS.REQUIRED_INDICATOR).length).toBe(2);
        });
    });

    describe('Helper Text', () => {
        it('does not render helper text when not provided', () => {
            const { queryByTestId } = renderWithTheme(
                <DatePicker value={null} onChange={jest.fn()} />
            );
            expect(queryByTestId(TEST_IDS.HELPER_TEXT)).not.toBeInTheDocument();
        });

        it('renders error text as highest priority', () => {
            const { queryByText } = renderWithTheme(
                <DatePicker
                    value={null}
                    onChange={jest.fn()}
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
                <DatePicker
                    value={null}
                    onChange={jest.fn()}
                    successMessage="Success"
                    helperText="Helper"
                />
            );
            expect(queryByText('Success')).toBeInTheDocument();
            expect(queryByText('Helper')).not.toBeInTheDocument();
        });

        it('renders helper text as lowest priority', () => {
            const { getByText } = renderWithTheme(
                <DatePicker
                    value={null}
                    onChange={jest.fn()}
                    helperText="Helper"
                />
            );
            expect(getByText('Helper')).toBeInTheDocument();
        });
    });

    describe('Error State', () => {
        it('renders error state', () => {
            const { getByText } = renderWithTheme(
                <DatePicker
                    value={null}
                    onChange={jest.fn()}
                    errorMessage="Hello"
                />
            );
            expect(getByText('Hello')).toBeVisible();
        });

        it('does not render error state when not provided', () => {
            const { queryByTestId } = renderWithTheme(
                <DatePicker value={null} onChange={jest.fn()} />
            );
            expect(queryByTestId(TEST_IDS.HELPER_TEXT)).not.toBeInTheDocument();
        });
    });

    describe('Success State', () => {
        it('renders success state', () => {
            const { getByText } = renderWithTheme(
                <DatePicker
                    value={null}
                    onChange={jest.fn()}
                    successMessage="Hello"
                />
            );
            expect(getByText('Hello')).toBeInTheDocument();
        });

        it('does not render success state when not provided', () => {
            const { queryByTestId } = renderWithTheme(
                <DatePicker value={null} onChange={jest.fn()} />
            );
            expect(queryByTestId(TEST_IDS.HELPER_TEXT)).not.toBeInTheDocument();
        });
    });
});
