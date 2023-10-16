import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { z } from 'zod';
import { FormRenderer } from '../FormRenderer';
import { TextAreaInput } from '../types';
import { renderWithTheme } from '../../../../fixtures';
import { getMockInputConfig } from '../__mocks__/getMockInputConfig';

describe('Textarea field', () => {
    const user = userEvent.setup();
    const errorMessage = 'Description is required.';
    const mockSchema = z.object({
        description: z.string().nonempty({
            message: errorMessage,
        }),
    });
    const mockTextareaConfig = getMockInputConfig({
        id: 'test',
        type: 'textarea',
        label: 'Tell us more',
        placeholder: 'placeholder',
        helperText: 'Helper text',
        statePath: 'description',
    });

    const textAreaDetails = mockTextareaConfig.sections[0]
        .fields[0] as TextAreaInput<z.infer<typeof mockSchema>>;
    it('renders textarea', () => {
        const { getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockTextareaConfig}
                validationMode={'onChange'}
                onSubmit={jest.fn()}
            />
        );
        expect(getByText(textAreaDetails.label)).toBeVisible();
        expect(getByText(textAreaDetails.helperText!)).toBeVisible();
    });

    it('captures textarea input', async () => {
        const mockSubmit = jest.fn();
        const { getByPlaceholderText, getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockTextareaConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
            />
        );
        const description = 'This is a description';
        const input = getByPlaceholderText(textAreaDetails.placeholder!);
        const submitButton = getByText('Submit');
        await user.type(input, description);
        expect(input).toHaveValue(description);
        await user.click(submitButton);
        const dataArg = mockSubmit.mock.calls[0][0];
        expect(dataArg).toEqual({ description });
    });

    it('validates textarea', async () => {
        const mockSubmit = jest.fn();
        const { getByPlaceholderText, getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockTextareaConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
            />
        );
        const input = getByPlaceholderText(textAreaDetails.placeholder!);
        const submitButton = getByText('Submit');
        await user.type(input, '1');
        await user.type(input, '{backspace}');
        fireEvent.blur(input);
        expect(getByText(errorMessage)).toBeVisible();
        expect(submitButton).toBeDisabled();
    });

    it('disables field when form is submitting', () => {
        const mockSubmit = jest.fn();
        const { getByPlaceholderText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockTextareaConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
                isSubmitting
            />
        );
        const input = getByPlaceholderText(textAreaDetails.placeholder!);
        expect(input).toBeDisabled();
    });
});
