import { useState } from 'react';
import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material';
import { IconButton } from '../Button';

export const Tooltip = ({
    children,
    open: baseOpen,
    ...props
}: TooltipProps) => {
    const [open, setOpen] = useState<boolean>(baseOpen ?? false);
    return (
        <IconButton
            type="text"
            onClick={() => {
                setOpen(!open);
            }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <MuiTooltip open={open} {...props}>
                {children}
            </MuiTooltip>
        </IconButton>
    );
};
