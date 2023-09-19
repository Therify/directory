import userEvent from '@testing-library/user-event';
import { z } from 'zod';
import { FormRenderer } from '../FormRenderer';
import { TelephoneInput } from '../types';
import { renderWithTheme } from '../../../../fixtures';
import { getMockInputConfig } from '../__mocks__/getMockInputConfig';

describe('Telephone field', () => {
    const user = userEvent.setup();
    const errorMessage = 'Phone number must be 10 characters.';
    const mockSchema = z.object({
        phone: z.string().nonempty().min(10, {
            message: errorMessage,
        }),
    });
    const mockConfig = getMockInputConfig({
        id: 'test',
        type: 'telephone',
        label: 'Phone Number',
        placeholder: '123',
        helperText: 'Enter your number',
        statePath: 'phone',
        format: 'US',
    });
    const inputDetails = mockConfig.sections[0].fields[0] as TelephoneInput<
        z.infer<typeof mockSchema>
    >;

    it('renders telephone input', () => {
        const { getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockConfig}
                validationMode={'onChange'}
                onSubmit={console.log}
            />
        );
        expect(getByText(inputDetails.label)).toBeVisible();
        expect(getByText(inputDetails.helperText!)).toBeVisible();
    });

    it('captures telephone input', async () => {
        const mockSubmit = jest.fn();
        const { getByPlaceholderText, getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
            />
        );
        const number = '1234567890';
        const input = getByPlaceholderText(inputDetails.placeholder!);
        const submitButton = getByText('Submit');
        await user.type(input, number);
        await user.click(submitButton);
        expect(mockSubmit).toHaveBeenCalledWith({ phone: number });
    });

    it('masks telephone input', async () => {
        const mockSubmit = jest.fn();
        const { getByPlaceholderText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
            />
        );
        const number = '1234567890';
        const input = getByPlaceholderText(inputDetails.placeholder!);
        await user.type(input, number);
        expect(input).toHaveValue('(123) 456-7890');
    });

    it('validates telephone input', async () => {
        const { getByPlaceholderText, getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockConfig}
                validationMode={'onChange'}
                onSubmit={jest.fn()}
            />
        );
        const userInput = '123';
        const input = getByPlaceholderText(inputDetails.placeholder!);
        const submitButton = getByText('Submit');
        await user.type(input, userInput);
        expect(getByText(errorMessage)).toBeVisible();
        expect(submitButton).toBeDisabled();
    });

    it('cleans non-numeric values from telephone input', async () => {
        const mockSubmit = jest.fn();
        const { getByPlaceholderText, getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
            />
        );
        const phone = '1a2b3c1d2e3f1g2h3i4j';
        const expectedPhone = '1231231234';
        const formattedPhone = '(123) 123-1234';
        const input = getByPlaceholderText(inputDetails.placeholder!);
        const submitButton = getByText('Submit');
        await user.type(input, phone);
        expect(input).toHaveValue(formattedPhone);
        await user.click(submitButton);
        expect(mockSubmit).toHaveBeenCalledWith({
            phone: expectedPhone,
        });
    });

    it('disables field when form is submitting', () => {
        const { getByPlaceholderText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockConfig}
                validationMode={'onChange'}
                onSubmit={jest.fn()}
                isSubmitting
            />
        );
        const input = getByPlaceholderText(inputDetails.placeholder!);
        expect(input).toBeDisabled();
    });
});
