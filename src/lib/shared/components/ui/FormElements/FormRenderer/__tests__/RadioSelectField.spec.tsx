import userEvent from '@testing-library/user-event';
import { z } from 'zod';
import { FormRenderer } from '../FormRenderer';
import { RadioSelectInput } from '../types';
import { renderWithTheme } from '../../../../fixtures';
import { getMockInputConfig } from '../__mocks__/getMockInputConfig';
import { sleep } from '@/lib/shared/utils';

describe('Select field', () => {
    const user = userEvent.setup();
    const mockSchema = z.object({
        yesOrNo: z.enum(['Yes', 'No']),
    });
    const radioSelectConfig: RadioSelectInput<z.infer<typeof mockSchema>> = {
        id: 'yesOrNo',
        type: 'radio-select',
        label: 'Select yes or no',
        statePath: 'yesOrNo',
        options: ['Yes', 'No'],
    };
    const mockRadioSelectConfig = getMockInputConfig(radioSelectConfig);
    const radioSelectDetails = mockRadioSelectConfig.sections[0].fields[0] as RadioSelectInput<
        z.infer<typeof mockSchema>
    >;

    it('renders radio select', () => {
        const { getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockRadioSelectConfig}
                validationMode={'onChange'}
                onSubmit={console.log}
            />
        );
        expect(getByText(radioSelectDetails.label)).toBeVisible();
    });

    it('captures radio select value', async () => {
        const mockSubmit = jest.fn();
        const { getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockRadioSelectConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
            />
        );
        const submitButton = getByText('Submit');
        const optionEl = getByText('Yes');
        await userEvent.click(optionEl);
        await user.click(submitButton);
        expect(mockSubmit).toHaveBeenCalledWith({ yesOrNo: 'Yes' });
    });

    it('requires selection to submit', async () => {
        const mockSubmit = jest.fn();
        const { getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockRadioSelectConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
            />
        );
        const submitButton = getByText('Submit');
        expect(submitButton).toBeDisabled();
    });

    it('disables field when form is submitting', () => {
        const mockSubmit = jest.fn();
        const { getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockRadioSelectConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
                isSubmitting
            />
        );
        radioSelectDetails.options.forEach(option => {
            expect(getByText(option as string)).toHaveClass('Mui-disabled');
        })
    });

    it('selects default value when given at the field level', async () => {
            const mockSubmit = jest.fn();
            const mockDefaultValueConfig = getMockInputConfig({
                    ...radioSelectDetails,
                    defaultValue: 'Yes',
                });
            const { getByText } = renderWithTheme(
                <FormRenderer
                    validationSchema={mockSchema}
                    config={mockDefaultValueConfig}
                    validationMode={'onChange'}
                    onSubmit={mockSubmit}
                />
            );
            // allow the default value to re-render before assertion occurs
            await sleep(0);
            const submitButton = getByText('Submit');
            await user.click(submitButton);
            expect(mockSubmit).toHaveBeenCalledWith({ yesOrNo: 'Yes' });
        });
});
