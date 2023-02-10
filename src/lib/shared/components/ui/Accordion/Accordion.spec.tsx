import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../fixtures/renderWithTheme';
import { Accordion, TEST_IDS } from './index';

const mockItems = [
    {
        id: '0',
        header: 'Header 0',
        body: 'Body text 0',
    },
    {
        id: '1',
        header: 'Header 1',
        body: 'Body text 1',
    },
    {
        id: '2',
        header: 'Header 2',
        body: 'Body text 2',
    },
];

describe('Accordion', () => {
    it('renders accordion text items', () => {
        const { getByText } = renderWithTheme(
            <Accordion items={[mockItems[0]]} />
        );
        expect(getByText(mockItems[0].header)).toBeInTheDocument();
        expect(getByText(mockItems[0].body)).toBeInTheDocument();
    });

    it('renders ReactNodes when passed as items', () => {
        const testItem = {
            id: '0',
            header: <h3 data-testid="test-header">Header</h3>,
            body: <p data-testid="test-body">Body text</p>,
        };
        const { getByTestId } = renderWithTheme(
            <Accordion items={[testItem]} />
        );
        expect(getByTestId('test-header')).toBeInTheDocument();
        expect(getByTestId('test-body')).toBeInTheDocument();
    });

    it('only expands one item at a time', async () => {
        const user = userEvent.setup();
        const { queryByTestId, getByText } = renderWithTheme(
            <Accordion items={mockItems} allowMultiExpand={false} />
        );
        const header1 = getByText(mockItems[0].header);
        const header2 = getByText(mockItems[1].header);

        await user.click(header1);
        expect(
            queryByTestId(`${TEST_IDS.BODY_TEXT}-${mockItems[0].id}-expanded`)
        ).toBeInTheDocument();
        expect(
            queryByTestId(`${TEST_IDS.BODY_TEXT}-${mockItems[1].id}-expanded`)
        ).toBeNull();

        await user.click(header2);
        expect(
            queryByTestId(`${TEST_IDS.BODY_TEXT}-${mockItems[0].id}-expanded`)
        ).toBeNull();
        expect(
            queryByTestId(`${TEST_IDS.BODY_TEXT}-${mockItems[1].id}-expanded`)
        ).toBeInTheDocument();
    });

    it('default opens accordian item when defaultExpandedId present', () => {
        const { queryByTestId } = renderWithTheme(
            <Accordion defaultExpandedId={mockItems[0].id} items={mockItems} />
        );
        expect(
            queryByTestId(`${TEST_IDS.BODY_TEXT}-${mockItems[0].id}-expanded`)
        ).toBeVisible();
    });

    it('allows multiple expands', async () => {
        const user = userEvent.setup();
        const { queryByTestId, getByText } = renderWithTheme(
            <Accordion items={mockItems} allowMultiExpand={true} />
        );
        const header1 = getByText(mockItems[0].header);
        const header2 = getByText(mockItems[1].header);

        expect(
            queryByTestId(`${TEST_IDS.BODY_TEXT}-${mockItems[0].id}`)
        ).toBeInTheDocument();
        expect(
            queryByTestId(`${TEST_IDS.BODY_TEXT}-${mockItems[1].id}`)
        ).toBeInTheDocument();

        await user.click(header1);
        await user.click(header2);
        expect(
            queryByTestId(`${TEST_IDS.BODY_TEXT}-${mockItems[0].id}-expanded`)
        ).toBeInTheDocument();
        expect(
            queryByTestId(`${TEST_IDS.BODY_TEXT}-${mockItems[1].id}-expanded`)
        ).toBeInTheDocument();
    });
});
