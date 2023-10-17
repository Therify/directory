import userEvent from '@testing-library/user-event';
import { z } from 'zod';
import { FormRenderer } from '../FormRenderer';
import { SelectInput } from '../types';
import { renderWithTheme } from '../../../../fixtures';
import { getMockInputConfig } from '../__mocks__/getMockInputConfig';
import { TEST_IDS as SELECT_TEST_IDS } from '../../Select';

describe('Select field', () => {
    const user = userEvent.setup();
    const mockSchema = z.object({
        yesOrNo: z.enum(['Yes', 'No']),
    });
    const selectConfig: SelectInput<z.infer<typeof mockSchema>> = {
        id: 'yesOrNo',
        type: 'select',
        label: 'Select yes or no',
        helperText: 'Helper text',
        statePath: 'yesOrNo',
        options: ['Yes', 'No'],
    };
    const mockSelectConfig = getMockInputConfig(selectConfig);
    const selectDetails = mockSelectConfig.sections[0].fields[0] as SelectInput<
        z.infer<typeof mockSchema>
    >;

    it('renders select', () => {
        const { getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockSelectConfig}
                validationMode={'onChange'}
                onSubmit={console.log}
            />
        );
        expect(getByText(selectDetails.label)).toBeVisible();
        expect(getByText(selectDetails.helperText!)).toBeVisible();
    });

    it('captures select', async () => {
        const mockSubmit = jest.fn();
        const { getByTestId, getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockSelectConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
            />
        );
        const select = getByTestId(SELECT_TEST_IDS.SELECT).firstElementChild;
        const submitButton = getByText('Submit');
        await userEvent.click(select!);
        const optionEl = getByTestId(
            `${SELECT_TEST_IDS.SELECT_MENU_ITEM}-${'Yes'}`
        );
        await userEvent.click(optionEl);
        await user.click(submitButton);
        const dataArg = mockSubmit.mock.calls[0][0];
        expect(dataArg).toEqual({ yesOrNo: 'Yes' });
    });

    it('requires selection to submit', async () => {
        const mockSubmit = jest.fn();
        const { getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockSelectConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
            />
        );
        const submitButton = getByText('Submit');
        expect(submitButton).toBeDisabled();
    });

    it('disables field when form is submitting', () => {
        const mockSubmit = jest.fn();
        const { getByTestId } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockSelectConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
                isSubmitting
            />
        );
        const select = getByTestId(SELECT_TEST_IDS.SELECT).firstElementChild;

        expect(select?.getAttribute('aria-disabled')).toBe('true');
    });
});
