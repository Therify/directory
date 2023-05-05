import { useState } from 'react';
import {
    Tooltip as MuiTooltip,
    TooltipProps as MuiTooltipProps,
} from '@mui/material';
import { IconButton } from '../Button';
import { InfoOutlined } from '@mui/icons-material';

type TooltipProps = Omit<MuiTooltipProps, 'children'> & {
    children?: MuiTooltipProps['children'];
};
export const Tooltip = ({
    children,
    color,
    open: baseOpen,
    ...props
}: TooltipProps) => {
    const [open, setOpen] = useState<boolean>(baseOpen ?? false);
    return (
        <IconButton
            type="text"
            size="small"
            onClick={() => {
                setOpen(!open);
            }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <MuiTooltip open={open} color={color ?? 'info'} {...props}>
                {children ?? <InfoOutlined fontSize="small" />}
            </MuiTooltip>
        </IconButton>
    );
};
