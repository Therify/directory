import { sleep } from '@/lib/shared/utils';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { z } from 'zod';
import { FormRenderer } from '../FormRenderer';
import { ToggleInput } from '../types';
import { renderWithTheme } from '../../../../fixtures';
import { getMockInputConfig } from '../__mocks__/getMockInputConfig';

describe('Toggle Field', () => {
    const user = userEvent.setup();
    const mockSchema = z.object({
        iAgree: z.literal(true),
    });

    const mockConfig = getMockInputConfig({
        id: 'test',
        type: 'toggle',
        label: 'I agree to the terms',
        statePath: 'iAgree',
    });

    const toggleDetails = mockConfig.sections[0].fields[0] as ToggleInput<
        z.infer<typeof mockSchema>
    >;

    it('renders checkbox', () => {
        const { getByText, getByRole } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockConfig}
                validationMode={'onChange'}
                onSubmit={jest.fn()}
            />
        );
        expect(getByText(toggleDetails.label)).toBeVisible();
        expect(getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders radio', () => {
        const { getByText, getByRole } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={getMockInputConfig({
                    id: 'test',
                    type: 'toggle',
                    label: 'I agree to the terms',
                    statePath: 'iAgree',
                    toggleType: 'radio',
                })}
                validationMode={'onChange'}
                onSubmit={jest.fn()}
            />
        );
        expect(getByText(toggleDetails.label)).toBeVisible();
        expect(getByRole('radio')).toBeInTheDocument();
    });
    it('renders switch', () => {
        const { getByText, getByRole } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={getMockInputConfig({
                    id: 'test',
                    type: 'toggle',
                    label: 'I agree to the terms',
                    statePath: 'iAgree',
                    toggleType: 'switch',
                })}
                validationMode={'onChange'}
                onSubmit={jest.fn()}
            />
        );
        const input = getByRole('checkbox');
        expect(getByText(toggleDetails.label)).toBeVisible();
        expect(input.nextElementSibling).toHaveClass('MuiSwitch-thumb');
    });

    it('captures toggle input', async () => {
        const mockSubmit = jest.fn();
        const { getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
            />
        );

        const toggle = getByText(toggleDetails.label);
        const submitButton = getByText('Submit');
        await user.click(toggle);
        await user.click(submitButton);
        const dataArg = mockSubmit.mock.calls[0][0];
        expect(dataArg).toEqual({ iAgree: true });
    });

    it('validates toggle', async () => {
        const mockSubmit = jest.fn();
        const { getByText, getByRole } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
            />
        );
        const toggle = getByText(toggleDetails.label);
        const submitButton = getByText('Submit');
        await user.click(toggle); // Check
        await user.click(toggle); // Uncheck
        fireEvent.blur(toggle);
        await sleep(0); // Allow validation to run
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
        const input = getByRole('checkbox');
        expect(input).toBeDisabled();
    });
});
