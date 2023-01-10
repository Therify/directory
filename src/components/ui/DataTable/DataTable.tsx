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
    displayValue: string | ReactNode;
    align?: 'left' | 'center' | 'right' | 'justify';
    defaultRowValue?: ReactNode;
};

type DataTableProps<T> = {
    rows: T[];
    headers: DataTableHeader<T>[];
    onRowClick?: (row: T) => void;
    stopEventPropagationForCells?: (keyof T)[];
};

export const DataTable = <T extends Record<string, ReactNode>>({
    headers,
    rows,
    onRowClick,
    stopEventPropagationForCells,
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
}: {
    id: number;
    dataKeys: (keyof T)[];
    stopEventPropagationForCells?: Array<keyof T>;
    defaultRowValues: Record<keyof T, ReactNode>;
    row: T;
}) =>
    dataKeys.map((key, i) => {
        const component = i === 0 ? 'th' : undefined;
        const scope = i === 0 ? 'row' : undefined;
        const rowValue = row[key];
        return (
            <StyledTableCell
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
        typeof prop === 'string' && !['isFirst', 'isLast'].includes(prop),
})<{ isFirst?: boolean; isLast?: boolean }>(({ theme, isFirst, isLast }) => ({
    [`&.${tableCellClasses.head}`]: {
        ...theme.typography.overlineSmall,
        backgroundColor: theme.palette.grey[50],
        borderTopLeftRadius: isFirst ? theme.shape.borderRadius : 0,
        borderTopRightRadius: isLast ? theme.shape.borderRadius : 0,
        color: theme.palette.grey[500],
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: theme.typography.fontSize,
    },
}));

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
