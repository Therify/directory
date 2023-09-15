import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../../../fixtures/renderWithTheme';
import { TEST_IDS as INPUT_WRAPPER_TEST_IDS } from '../InputWrapper';
import { MaskedInput } from './MaskedInput';

describe('Masked Input', () => {
    const mask = '999-999-9999';
    it('handles input changes', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        const { getByRole } = renderWithTheme(
            <MaskedInput mask={mask} id="test" onChange={onChange} />
        );
        const input = getByRole('textbox');
        await user.type(input, '12345');
        expect(onChange).toHaveBeenCalledTimes(5);
    });

    it('passes value to the input', () => {
        const { getByRole } = renderWithTheme(
            <MaskedInput mask={mask} id="test" value="12" />
        );
        const input = getByRole('textbox');
        expect(input).toHaveValue('12');
    });

    it('passes placeholder to the input', () => {
        const { getByRole } = renderWithTheme(
            <MaskedInput mask={mask} id="test" placeholder="Hello" />
        );
        const input = getByRole('textbox');
        expect(input).toHaveAttribute('placeholder', 'Hello');
    });

    it('disables', () => {
        const { getByRole } = renderWithTheme(
            <MaskedInput mask={mask} id="test" disabled />
        );
        const input = getByRole('textbox');
        expect(input).toBeDisabled();
    });

    describe('Label', () => {
        it('renders label', () => {
            const { getByText } = renderWithTheme(
                <MaskedInput mask={mask} id="test" label="Hello" />
            );
            expect(getByText('Hello')).toBeVisible();
        });

        it('does not render label when not provided', () => {
            const { queryByTestId } = renderWithTheme(
                <MaskedInput mask={mask} id="test" />
            );
            expect(
                queryByTestId(INPUT_WRAPPER_TEST_IDS.LABEL)
            ).not.toBeInTheDocument();
        });

        it('renders label with required *', () => {
            const { getByText } = renderWithTheme(
                <MaskedInput mask={mask} id="test" label="Hello" required />
            );
            expect(getByText('Hello')).toHaveTextContent('Hello *');
        });
    });

    describe('Helper Text', () => {
        it('does not render helper text when not provided', () => {
            const { queryByTestId } = renderWithTheme(
                <MaskedInput mask={mask} id="test" />
            );
            expect(
                queryByTestId(INPUT_WRAPPER_TEST_IDS.HELPER_TEXT)
            ).not.toBeInTheDocument();
        });

        it('renders error text as highest priority', () => {
            const { queryByText } = renderWithTheme(
                <MaskedInput
                    mask={mask}
                    id="test"
                    errorMessage="Error"
                    successMessage="Success"
                    helperText="Helper"
                />
            );
            expect(queryByText('Error')).toBeVisible();
            expect(queryByText('Success')).not.toBeInTheDocument();
            expect(queryByText('Helper')).not.toBeInTheDocument();
        });

        it('renders success text as second highest priority', () => {
            const { queryByText } = renderWithTheme(
                <MaskedInput
                    mask={mask}
                    id="test"
                    successMessage="Success"
                    helperText="Helper"
                />
            );
            expect(queryByText('Success')).toBeVisible();
            expect(queryByText('Helper')).not.toBeInTheDocument();
        });

        it('renders helper text as lowest priority', () => {
            const { getByText } = renderWithTheme(
                <MaskedInput mask={mask} id="test" helperText="Helper" />
            );
            expect(getByText('Helper')).toBeVisible();
        });
    });

    describe('Error State', () => {
        it('renders error state', () => {
            const { getByText, getByTestId, theme } = renderWithTheme(
                <MaskedInput mask={mask} id="test" errorMessage="Hello" />
            );
            expect(getByText('Hello')).toBeVisible();
            expect(getByTestId(INPUT_WRAPPER_TEST_IDS.INPUT)).toHaveStyle(
                `border-color: ${theme.palette.error.main}`
            );
        });

        it('does not render error state when not provided', () => {
            const { queryByTestId } = renderWithTheme(
                <MaskedInput mask={mask} id="test" />
            );
            expect(
                queryByTestId(INPUT_WRAPPER_TEST_IDS.HELPER_TEXT)
            ).not.toBeInTheDocument();
        });
    });

    describe('Success State', () => {
        it('renders success state', () => {
            const { getByText, getByTestId, theme } = renderWithTheme(
                <MaskedInput mask={mask} id="test" successMessage="Hello" />
            );
            expect(getByText('Hello')).toBeVisible();
            expect(getByTestId(INPUT_WRAPPER_TEST_IDS.INPUT)).toHaveStyle(
                `border-color: ${theme.palette.success.main}`
            );
        });

        it('does not render success state when not provided', () => {
            const { queryByTestId } = renderWithTheme(
                <MaskedInput mask={mask} id="test" />
            );
            expect(
                queryByTestId(INPUT_WRAPPER_TEST_IDS.HELPER_TEXT)
            ).not.toBeInTheDocument();
        });
    });
    describe('Masking', () => {
        it('applies input', () => {
            const { getByRole } = renderWithTheme(
                <MaskedInput
                    mask={'999-999-9999'}
                    id="test"
                    value="1234567890"
                />
            );
            const input = getByRole('textbox');
            expect(input).toHaveValue('123-456-7890');
        });

        it('applies masking placeholder character to value', () => {
            const { getByRole } = renderWithTheme(
                <MaskedInput
                    mask={'999-999-9999'}
                    maskPlaceholderCharacter="!"
                    id="test"
                    value="12345678"
                />
            );
            const input = getByRole('textbox');
            expect(input).toHaveValue('123-456-78!!');
        });

        it('calls beforeMaskedStateChange before applying mask', () => {
            const mockBeforeMaskedStateChange = jest.fn();
            const mockValue = '1';
            mockBeforeMaskedStateChange.mockReturnValue({
                value: mockValue,
            });
            const { getByRole } = renderWithTheme(
                <MaskedInput
                    mask={'999-999-9999'}
                    maskPlaceholderCharacter="!"
                    id="test"
                    value="12345678"
                    beforeMaskedStateChange={mockBeforeMaskedStateChange}
                />
            );

            expect(mockBeforeMaskedStateChange).toHaveBeenCalled();
            const input = getByRole('textbox');
            expect(input).toHaveValue(mockValue);
        });

        it('can always show mask', () => {
            const { getByRole } = renderWithTheme(
                <MaskedInput
                    mask={'999-999-9999'}
                    id="test"
                    maskPlaceholderCharacter="_"
                    value=""
                    alwaysShowMask
                />
            );
            const input = getByRole('textbox');
            expect(input).toHaveValue('___-___-____');
        });
    });
});
