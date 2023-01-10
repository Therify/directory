import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../fixtures/renderWithTheme';
import { DataTableMocks, MockMember } from './DataTable.mocks';
import { DataTable } from './index';

const { headers, rows: mockRows } = DataTableMocks;
// Remove empty string display text for getByText testing
const mockHeaders = headers.filter(({ displayValue }) => Boolean(displayValue));

describe('Data Table', () => {
    const user = userEvent.setup();
    describe('Rendering table headers', () => {
        it.each(mockHeaders)(
            'renders header cells: $displayValue',
            ({ displayValue }) => {
                const { getByText } = renderWithTheme(
                    <DataTable headers={mockHeaders} rows={[]} />
                );
                const cell = getByText(displayValue as string);
                expect(cell).toBeVisible();
            }
        );
    });

    describe('Rendering data rows', () => {
        it.each(mockRows)(
            'renders data rows: $member',
            ({ member, insurance, state }) => {
                const { getByText } = renderWithTheme(
                    <DataTable headers={mockHeaders} rows={mockRows} />
                );
                expect(getByText(member as string)).toBeVisible();
                expect(getByText(insurance as string)).toBeVisible();
                expect(getByText(state as string)).toBeVisible();
            }
        );

        it('renders default values when provided', () => {
            const defaultRowValue = 'Default value';
            const { getByText } = renderWithTheme(
                <DataTable
                    headers={[{ ...mockHeaders[0], defaultRowValue }]}
                    rows={[{} as MockMember]}
                />
            );
            expect(getByText(defaultRowValue)).toBeVisible();
        });
    });

    describe('Clickable rows', () => {
        it('calls onRowClick when data row is clicked', async () => {
            const onRowClick = jest.fn();
            const { getByText } = renderWithTheme(
                <DataTable
                    headers={mockHeaders}
                    rows={mockRows}
                    onRowClick={onRowClick}
                />
            );

            await Promise.all(
                mockRows.map(async ({ member }, i) => {
                    const row = getByText(member as string).parentElement;
                    if (!row) throw new Error('Row not found');
                    await user.click(row);
                    expect(onRowClick).toHaveBeenCalledWith(mockRows[i]);
                })
            );
            expect(onRowClick).toHaveBeenCalledTimes(mockRows.length);
        });

        it('applies .row-clickable class when clickable', () => {
            const { getByText } = renderWithTheme(
                <DataTable
                    headers={mockHeaders}
                    rows={mockRows}
                    onRowClick={() => {
                        return;
                    }}
                />
            );
            mockRows.forEach(({ member }) => {
                const row = getByText(member as string).parentElement;
                expect(row).toHaveClass('row-clickable');
            });
        });

        it('stops event propagation from a Table Cell when cell in stopEventPropagationForCells', async () => {
            const onRowClick = jest.fn();
            const row = mockRows[0];
            const { getByText } = renderWithTheme(
                <DataTable
                    headers={mockHeaders}
                    rows={[row]}
                    onRowClick={onRowClick}
                    stopEventPropagationForCells={[headers[0].rowKey]}
                />
            );

            await user.click(getByText(row.member as string));
            expect(onRowClick).not.toHaveBeenCalled();
        });
    });
});
