import { MoreHoriz } from '@mui/icons-material';
import { action } from '@storybook/addon-actions';

import { BUTTON_SIZE, BUTTON_TYPE, IconButton } from '../Button';
import { DataTableHeader } from './DataTable';

export type MockMember = {
    member: React.ReactNode;
    dueDate: React.ReactNode;
    state: React.ReactNode;
    insurance: React.ReactNode;
    company: React.ReactNode;
    moreActions: React.ReactNode;
};

const headers: DataTableHeader<MockMember>[] = [
    { rowKey: 'member', displayValue: 'Member' },
    { rowKey: 'dueDate', displayValue: 'Due Date' },
    { rowKey: 'state', displayValue: 'State' },
    { rowKey: 'insurance', displayValue: 'Insurance' },
    { rowKey: 'company', displayValue: 'Company', defaultRowValue: 'unknown' },
    { rowKey: 'moreActions', displayValue: '' },
];

const onMoreButtonClick = action('More button clicked in row: ');

function createData(
    member: React.ReactNode,
    dueDate: React.ReactNode,
    state: React.ReactNode,
    insurance: React.ReactNode,
    company: React.ReactNode
): MockMember {
    return {
        member,
        dueDate,
        state,
        insurance,
        company,
        moreActions: (
            <IconButton
                color="info"
                type={BUTTON_TYPE.TEXT}
                size={BUTTON_SIZE.SMALL}
                onClick={() => onMoreButtonClick(member)}
            >
                <MoreHoriz />
            </IconButton>
        ),
    };
}

const rows: MockMember[] = [
    createData(
        'Warren Sadler',
        null,
        'California',
        'United Health Care',
        'Therify'
    ),
    createData('Jessie Wooten', null, 'Tennessee', 'Aetna', 'Therify'),
    createData('James Murray', null, 'New York', 'Cigna', 'Therify'),
];

export const DataTableMocks = {
    rows,
    headers,
};
