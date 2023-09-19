import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { z } from 'zod';
import { FormRenderer } from '../FormRenderer';
import { DatePickerInput } from '../types';
import { renderWithTheme } from '../../../../fixtures';
import { getMockInputConfig } from '../__mocks__/getMockInputConfig';

describe('Date field', () => {
    const user = userEvent.setup();
    const errorMessage = 'Date must be in the past.';
    const mockSchema = z.object({
        date: z.date().max(new Date(), {
            message: errorMessage,
        }),
    });
    const mockConfig = getMockInputConfig({
        id: 'test',
        type: 'date',
        label: 'Date Picker',
        helperText: 'Enter a date',
        statePath: 'date',
    });

    const dateDetails = mockConfig.sections[0].fields[0] as DatePickerInput<
        z.infer<typeof mockSchema>
    >;

    it('renders date picker', () => {
        const { getByText, getByLabelText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockConfig}
                validationMode={'onChange'}
                onSubmit={jest.fn()}
            />
        );
        expect(getByLabelText(dateDetails.label)).toBeVisible();
        expect(getByText(dateDetails.helperText!)).toBeVisible();
    });

    it('captures date input', async () => {
        const mockSubmit = jest.fn();
        const { getByRole, getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
            />
        );
        const userInput = '10/10/1990';
        const input = getByRole('textbox');
        const submitButton = getByText('Submit');
        await user.type(input, userInput);
        expect(input).toHaveValue(userInput);
        await user.click(submitButton);
        expect(mockSubmit).toHaveBeenCalledWith({
            date: new Date(userInput),
        });
    });

    it('confirms date validity', async () => {
        const mockSubmit = jest.fn();
        const { getByRole, getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
            />
        );
        const userInput = '10/10';
        const input = getByRole('textbox');
        const submitButton = getByText('Submit');
        await user.type(input, userInput);
        expect(getByText('Invalid date')).toBeVisible();
        expect(submitButton).toBeDisabled();
    });

    it('validates date with schema', async () => {
        const mockSubmit = jest.fn();
        const { getByRole, getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
            />
        );
        const userInput = `10/10/${new Date().getFullYear() + 1}`;
        const input = getByRole('textbox');
        const submitButton = getByText('Submit');
        await user.type(input, userInput);
        fireEvent.blur(input);
        expect(getByText(errorMessage)).toBeVisible();
        expect(submitButton).toBeDisabled();
    });

    it('disables field when form is submitting', () => {
        const mockSubmit = jest.fn();
        const { getByRole } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
                isSubmitting
            />
        );
        const input = getByRole('textbox');
        expect(input).toBeDisabled();
    });
});
