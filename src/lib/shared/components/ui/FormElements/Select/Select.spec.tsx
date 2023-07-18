import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../../fixtures/renderWithTheme';
import { Select, SelectOption, TEST_IDS } from './index';

const mockOptions: SelectOption[] = [
    {
        id: '1',
        value: '1',
        displayText: 'Option 1',
    },
    {
        id: '2',
        value: '2',
        displayText: 'Option 2',
    },
];

describe('Select', () => {
    const user = userEvent.setup();

    describe('Label', () => {
        it('renders label', () => {
            const { getByText } = renderWithTheme(
                <Select id="test" options={mockOptions} label="Hello" />
            );
            expect(getByText('Hello')).toBeVisible();
        });

        it('does not render label when not provided', () => {
            const { queryByTestId } = renderWithTheme(
                <Select id="test" options={mockOptions} />
            );
            expect(queryByTestId(TEST_IDS.LABEL)).not.toBeInTheDocument();
        });

        it('renders label with "*" when marked required', () => {
            const { getByText } = renderWithTheme(
                <Select
                    id="test"
                    options={mockOptions}
                    label="Hello"
                    required
                />
            );
            expect(getByText('Hello')).toHaveTextContent('Hello *');
        });
    });

    describe('Helper Text', () => {
        it('renders helper text', async () => {
            const { getByText, getByTestId } = renderWithTheme(
                <Select id="test" options={mockOptions} helperText="Helper" />
            );
            expect(getByText('Helper')).toBeVisible();
            expect(getByTestId(TEST_IDS.HELPER_TEXT)).toBeVisible();
        });

        it('does not render helper text when not provided', () => {
            const { queryByTestId } = renderWithTheme(
                <Select id="test" options={mockOptions} />
            );
            expect(queryByTestId(TEST_IDS.HELPER_TEXT)).not.toBeInTheDocument();
        });

        it('renders error text as highest priority', () => {
            const { queryByText } = renderWithTheme(
                <Select
                    id="test"
                    options={mockOptions}
                    errorMessage="Error"
                    helperText="Helper"
                />
            );
            expect(queryByText('Error')).toBeVisible();
            expect(queryByText('Helper')).not.toBeInTheDocument();
        });

        it('renders helper text as lowest priority', () => {
            const { getByText } = renderWithTheme(
                <Select id="test" options={mockOptions} helperText="Helper" />
            );
            expect(getByText('Helper')).toBeVisible();
        });
    });

    describe('Error', () => {
        it.skip('renders error state', () => {
            // TODO: this test started randomly failing
            const { getByText, getByTestId, theme } = renderWithTheme(
                <Select id="test" options={mockOptions} errorMessage="Error" />
            );
            expect(getByText('Error')).toBeInTheDocument();
            const select = getByTestId(TEST_IDS.SELECT);
            expect(select).toHaveStyle(
                `border-color: ${theme.palette.error.main}`
            );
        });

        it('does not render error state when not provided', () => {
            const { queryByTestId } = renderWithTheme(
                <Select id="test" options={mockOptions} />
            );
            expect(queryByTestId(TEST_IDS.HELPER_TEXT)).not.toBeInTheDocument();
        });
    });

    describe('Non-native select', () => {
        it('renders options as <li>', async () => {
            const { getByTestId } = renderWithTheme(
                <Select id="test" options={mockOptions} />
            );
            const select = getByTestId(TEST_IDS.SELECT).firstElementChild;
            await user.click(select!);
            mockOptions.forEach((option) => {
                const optionEl = getByTestId(
                    `${TEST_IDS.SELECT_MENU_ITEM}-${option.id}`
                );
                expect(optionEl).toHaveTextContent(option.displayText);
                expect(optionEl.nodeName).toBe('LI');
            });
        });

        it('calls onChange with the selected value', async () => {
            const onChange = jest.fn();
            const { getByTestId } = renderWithTheme(
                <Select id="test" options={mockOptions} onChange={onChange} />
            );
            const select = getByTestId(TEST_IDS.SELECT).firstElementChild;
            await user.click(select!);
            const optionEl = getByTestId(
                `${TEST_IDS.SELECT_MENU_ITEM}-${mockOptions[0].id}`
            );
            await user.click(optionEl);
            expect(onChange).toHaveBeenCalledWith(mockOptions[0].value);
        });

        it('displays the selected value', async () => {
            const { getByText } = renderWithTheme(
                <Select
                    id="test"
                    options={mockOptions}
                    value={mockOptions[0].value}
                />
            );
            expect(getByText(mockOptions[0].displayText)).toBeVisible();
        });

        describe('Placeholder', () => {
            it('renders placeholder on select box', () => {
                const { getByTestId } = renderWithTheme(
                    <Select
                        id="test"
                        options={mockOptions}
                        placeholder="Hello"
                    />
                );
                const placeholder = getByTestId(TEST_IDS.PLACEHOLDER);
                expect(placeholder).toBeInTheDocument();
            });

            it('does not render placeholder on select box when selection made', () => {
                const { queryByTestId } = renderWithTheme(
                    <Select
                        id="test"
                        options={mockOptions}
                        value={mockOptions[0].value}
                        placeholder="Hello"
                    />
                );
                const placeholder = queryByTestId(TEST_IDS.PLACEHOLDER);
                expect(placeholder).not.toBeInTheDocument();
            });

            it('renders placeholder in list', async () => {
                const { getByTestId } = renderWithTheme(
                    <Select
                        id="test"
                        options={mockOptions}
                        placeholder="Hello"
                    />
                );
                const select = getByTestId(TEST_IDS.SELECT).firstElementChild;
                await user.click(select!);
                const placeholder = getByTestId(
                    TEST_IDS.SELECT_MENU_ITEM_PLACEHOLDER
                );
                expect(placeholder).toBeInTheDocument();
                expect(placeholder).toHaveTextContent('Hello');
                expect(placeholder).toHaveAttribute('aria-disabled', 'true');
            });

            it('does not render placeholder when not provided', async () => {
                const { queryByTestId } = renderWithTheme(
                    <Select id="test" options={mockOptions} />
                );
                const select = queryByTestId(
                    TEST_IDS.SELECT
                )?.firstElementChild;
                await user.click(select!);
                expect(
                    queryByTestId(TEST_IDS.SELECT_MENU_ITEM_PLACEHOLDER)
                ).not.toBeInTheDocument();
                expect(
                    queryByTestId(TEST_IDS.PLACEHOLDER)
                ).not.toBeInTheDocument();
            });
        });

        describe('Error State', () => {
            it.skip('renders error state on select', () => {
                // TODO: this test started randomly failing
                const { getByTestId, theme } = renderWithTheme(
                    <Select
                        id="test"
                        options={mockOptions}
                        errorMessage="Error"
                    />
                );
                expect(getByTestId(TEST_IDS.SELECT)).toHaveStyle(
                    `border-color: ${theme.palette.error.main}`
                );
            });
        });
    });

    describe('Native select', () => {
        it('renders options as <option>', async () => {
            const { getByTestId } = renderWithTheme(
                <Select id="test" native options={mockOptions} />
            );
            const select = getByTestId(TEST_IDS.SELECT).firstElementChild;
            await user.click(select!);
            mockOptions.forEach((option) => {
                const optionEl = getByTestId(
                    `${TEST_IDS.SELECT_MENU_ITEM}-${option.id}`
                );
                expect(optionEl).toHaveTextContent(option.displayText);
                expect(optionEl.nodeName).toBe('OPTION');
            });
        });

        it('calls onChange with the selected value', async () => {
            const onChange = jest.fn();
            const { getByRole } = renderWithTheme(
                <Select
                    id="test"
                    native
                    options={mockOptions}
                    onChange={onChange}
                />
            );
            const select = getByRole('combobox');
            await user.selectOptions(select, [mockOptions[0].value]);
            expect(onChange).toHaveBeenCalledWith(mockOptions[0].value);
        });

        it('displays the selected value', () => {
            const { getByText } = renderWithTheme(
                <Select
                    id="test"
                    native
                    options={mockOptions}
                    value={mockOptions[0].value}
                />
            );
            expect(getByText(mockOptions[0].displayText)).toBeVisible();
        });

        describe('Placeholder', () => {
            it('renders placeholder in list', () => {
                const { getByTestId } = renderWithTheme(
                    <Select
                        id="test"
                        native
                        options={mockOptions}
                        placeholder="Hello"
                    />
                );
                const placeholder = getByTestId(
                    TEST_IDS.SELECT_MENU_ITEM_PLACEHOLDER
                );
                expect(placeholder).toBeInTheDocument();
                expect(placeholder).toHaveTextContent('Hello');
                expect(placeholder).toBeDisabled();
            });

            it('does not render placeholder in list when not provided', () => {
                const { queryByTestId } = renderWithTheme(
                    <Select id="test" native options={mockOptions} />
                );
                const placeholder = queryByTestId(
                    TEST_IDS.SELECT_MENU_ITEM_PLACEHOLDER
                );
                expect(placeholder).not.toBeInTheDocument();
            });

            it('does not render non-native placeholder when native select', () => {
                const { queryByTestId } = renderWithTheme(
                    <Select
                        id="test"
                        native
                        options={mockOptions}
                        placeholder="Hello"
                    />
                );
                const placeholder = queryByTestId(TEST_IDS.PLACEHOLDER);
                expect(placeholder).not.toBeInTheDocument();
            });
        });

        describe('Error State', () => {
            it.skip('renders error state on select', () => {
                // TODO: this test started randomly failing
                const { getByTestId, theme } = renderWithTheme(
                    <Select
                        native
                        id="test"
                        options={mockOptions}
                        errorMessage="Error"
                    />
                );
                expect(getByTestId(TEST_IDS.SELECT)).toHaveStyle(
                    `border-color: ${theme.palette.error.main}`
                );
            });
        });
    });
});
