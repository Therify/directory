import { ReactNode } from 'react';

import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableProps,
    TableRow,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled, alpha } from '@mui/material/styles';

export type DataTableHeader<T> = {
    rowKey: keyof T;
    displayValue?: string | ReactNode;
    align?: 'left' | 'center' | 'right' | 'justify';
    defaultRowValue?: ReactNode;
};
export const DATA_TABLE_TYPE = {
    DATA: 'data',
    LIST: 'list',
} as const;

type TableType = typeof DATA_TABLE_TYPE[keyof typeof DATA_TABLE_TYPE];

type DataTableProps<T> = {
    rows: T[];
    headers: DataTableHeader<T>[];
    onRowClick?: (row: T) => void;
    stopEventPropagationForCells?: (keyof T)[];
    type?: TableType;
};

export const DataTable = <T extends Record<string, ReactNode>>({
    headers,
    rows,
    onRowClick,
    stopEventPropagationForCells,
    type = DATA_TABLE_TYPE.DATA,
    ...tableProps
}: DataTableProps<T> & TableProps) => {
    const [headerKeys, defaultRowValues] = headers.reduce<
        [Array<keyof T>, Record<keyof T, ReactNode>]
    >(
        ([headerKeys, defaultRowValues], { rowKey, defaultRowValue }) => [
            [...headerKeys, rowKey],
            {
                ...defaultRowValues,
                ...(defaultRowValue ? { [rowKey]: defaultRowValue } : {}),
            },
        ],
        [[], {} as Record<keyof T, ReactNode>]
    );
    return (
        <TableContainer>
            <Table
                {...tableProps}
                sx={{ minWidth: 600, ...tableProps.sx }}
                aria-label={tableProps['aria-label'] ?? 'data table'}
            >
                <TableHead>
                    <TableRow>
                        {headers.map(
                            ({ rowKey, displayValue, align }, index) => (
                                <StyledTableCell
                                    type={type}
                                    key={rowKey.toString()}
                                    isFirst={index === 0}
                                    isLast={index === headers.length - 1}
                                    align={
                                        align ?? index === 0
                                            ? undefined
                                            : 'right'
                                    }
                                >
                                    {displayValue}
                                </StyledTableCell>
                            )
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, id) => (
                        <StyledTableRow
                            className={onRowClick ? 'row-clickable' : undefined}
                            key={id}
                            onClick={() => onRowClick?.(row)}
                        >
                            {createCells({
                                type,
                                id,
                                row,
                                dataKeys: headerKeys,
                                defaultRowValues,
                                stopEventPropagationForCells,
                            })}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const createCells = <T extends Record<string, ReactNode>>({
    id,
    dataKeys,
    row,
    defaultRowValues,
    stopEventPropagationForCells,
    type,
}: {
    id: number;
    dataKeys: (keyof T)[];
    stopEventPropagationForCells?: Array<keyof T>;
    defaultRowValues: Record<keyof T, ReactNode>;
    row: T;
    type: TableType;
}) =>
    dataKeys.map((key, i) => {
        const component = i === 0 ? 'th' : undefined;
        const scope = i === 0 ? 'row' : undefined;
        const rowValue = row[key];
        return (
            <StyledTableCell
                type={type}
                key={`${id}-${key as string}`}
                component={component}
                scope={scope}
                align={i === 0 ? 'left' : 'right'}
                onClick={
                    stopEventPropagationForCells?.includes(key)
                        ? (e) => e.stopPropagation()
                        : undefined
                }
            >
                {rowValue || defaultRowValues[key]}
            </StyledTableCell>
        );
    });

const StyledTableCell = styled(TableCell, {
    shouldForwardProp: (prop) =>
        !['isFirst', 'isLast', 'type'].includes(prop.toString()),
})<{ isFirst?: boolean; isLast?: boolean; type: TableType }>(
    ({ theme, isFirst, isLast, type }) => ({
        [`&.${tableCellClasses.head}`]: {
            ...(type === DATA_TABLE_TYPE.DATA
                ? {
                      ...theme.typography.overlineSmall,
                      backgroundColor: theme.palette.grey[50],
                  }
                : theme.typography.caption),
            borderTopLeftRadius: isFirst ? theme.shape.borderRadius : 0,
            borderTopRightRadius: isLast ? theme.shape.borderRadius : 0,
            color: theme.palette.grey[500],
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: theme.typography.fontSize,
            borderBottom: `1px solid ${theme.palette.grey[50]}`,
        },
    })
);

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&.row-clickable': {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: alpha(theme.palette.grey[50], 0.4),
        },
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
