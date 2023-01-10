import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../../../fixtures/renderWithTheme';
import { TEST_IDS as INPUT_TEST_IDS } from '../Input';
import { Textarea } from './index';

const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis sodales augue. Cras dui leo, hendrerit sed vehicula at, venenatis at mi. Suspendisse malesuada semper lacus at dapibus. In hac habitasse platea dictumst. Quisque augue diam, lobortis non interdum a, interdum faucibus urna. Nullam accumsan volutpat turpis, at pretium justo cursus eu. Fusce et nibh pulvinar libero scelerisque commodo. Proin euismod mauris ac magna hendrerit, facilisis commodo massa fringilla. Etiam turpis nulla, facilisis nec gravida quis, accumsan in nulla. Maecenas bibendum enim non nisi facilisis fermentum vel quis nisi. Fusce eu efficitur ipsum, sed vulputate odio. Nullam a mollis sem, eu ultricies erat. Nulla tempor volutpat fringilla. Cras eu gravida enim. Donec dictum massa sed metus mattis, eu gravida sem cursus.`;

describe('Textarea', () => {
    jest.setTimeout(30000);
    const rowHeight = 17;
    const user = userEvent.setup();
    it('only uses rows when provided', async () => {
        const { getByTestId } = renderWithTheme(
            <Textarea id="test" rows={2} minRows={1} maxRows={6} />
        );
        const textarea = getByTestId(INPUT_TEST_IDS.INPUT);
        await user.type(textarea, longText);
        expect(textarea.firstElementChild).toHaveAttribute('rows', '2');
        expect(textarea).toHaveStyle(`height: ${rowHeight * 2}`);
    });

    it('uses min and max rows when provided', async () => {
        const { getByTestId } = renderWithTheme(
            <Textarea id="test" minRows={1} maxRows={2} />
        );
        const textarea = getByTestId(INPUT_TEST_IDS.INPUT);
        expect(textarea).toHaveStyle(`height: ${rowHeight * 1}`);
        await user.type(textarea, longText);
        expect(textarea).toHaveStyle(`height: ${rowHeight * 2}`);
    });

    it('uses min and max row defaults when no overrides provided', async () => {
        const { getByTestId } = renderWithTheme(<Textarea id="test" />);
        const textarea = getByTestId(INPUT_TEST_IDS.INPUT);
        expect(textarea).toHaveStyle(`height: ${rowHeight * 4}`);
        await user.type(textarea, longText);
        expect(textarea).toHaveStyle(`height: ${rowHeight * 8}`);
    });
});
