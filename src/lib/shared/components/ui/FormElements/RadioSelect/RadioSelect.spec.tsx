import { renderWithTheme } from '../../../fixtures';
import { SelectOption } from '../Select';
import { RadioSelect } from './RadioSelect';

const question =
    'In the 2 weeks have you had little interest or pleasure in doing things?';
const options: SelectOption[] = [
    {
        id: 'not-at-all',
        displayText: 'Not at all',
        value: 'not-at-all',
    },
    {
        id: 'several-days',
        displayText: 'Several days',
        value: 'several-days',
    },
    {
        id: 'more-than-half-the-days',
        displayText: 'More than half the days',
        value: 'more-than-half-the-days',
    },
    {
        id: 'nearly-every-day',
        displayText: 'Nearly every day',
        value: 'nearly-every-day',
    },
];

describe('RadioSelect', () => {
    it('should render label text', () => {
        const mockOnChange = jest.fn();
        const { getByText } = renderWithTheme(
            <RadioSelect
                id="radio-select"
                options={options}
                label={question}
                onChange={mockOnChange}
            />
        );
        expect(getByText(question)).toBeVisible();
    });

    it('should render options', () => {
        const mockOnChange = jest.fn();
        const { getByText } = renderWithTheme(
            <RadioSelect
                id="radio-select"
                options={options}
                label={question}
                onChange={mockOnChange}
            />
        );
        options.forEach((option) => {
            expect(getByText(option.displayText)).toBeVisible();
        });
    });

    it('should render required indicator', () => {
        const mockOnChange = jest.fn();
        const { getByText } = renderWithTheme(
            <RadioSelect
                id="radio-select"
                options={options}
                label={question}
                onChange={mockOnChange}
                required
            />
        );
        expect(getByText('*')).toBeVisible();
    });

    it('should call onChange when an option is selected', () => {
        const mockOnChange = jest.fn();
        const { getByText } = renderWithTheme(
            <RadioSelect
                id="radio-select"
                options={options}
                label={question}
                onChange={mockOnChange}
            />
        );
        const option = getByText(options[0].displayText);
        option.click();
        expect(mockOnChange).toHaveBeenCalledWith(options[0].value);
    });

    it('should disable option', () => {
        const mockOnChange = jest.fn();
        const { getByText } = renderWithTheme(
            <RadioSelect
                id="radio-select"
                options={[{ ...options[0], disabled: true }]}
                label={question}
                onChange={mockOnChange}
            />
        );
        const option = getByText(options[0].displayText);
        expect(option.previousSibling).toHaveAttribute('aria-disabled', 'true');
    });

    it('should disable entire input', () => {
        const mockOnChange = jest.fn();
        const { getByText } = renderWithTheme(
            <RadioSelect
                id="radio-select"
                options={options}
                label={question}
                onChange={mockOnChange}
                disabled
            />
        );
        options.forEach((option) => {
            const optionEl = getByText(option.displayText);
            expect(optionEl.previousSibling).toHaveAttribute(
                'aria-disabled',
                'true'
            );
        });
    });
});
