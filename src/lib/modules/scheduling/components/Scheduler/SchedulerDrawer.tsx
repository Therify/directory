import { Drawer as MuiDrawer, Box } from '@mui/material';
import { SxProps, Theme, styled } from '@mui/material/styles';
import { ChevronLeftRounded as CloseIcon } from '@mui/icons-material';
import {
    CenteredContainer,
    H6,
    BUTTON_TYPE,
    BUTTON_SIZE,
    IconButton,
} from '@/lib/shared/components/ui';
import { Scheduler, SchedulerProps } from './Scheduler';

interface SchedulerDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    sx?: SxProps<Theme>;
}

export const SchedulerDrawer = ({
    isOpen,
    onClose,
    title,
    sx,
    ...schedulerProps
}: SchedulerDrawerProps & Omit<SchedulerProps, 'headerSlot' | 'children'>) => {
    return (
        <Drawer
            open={isOpen}
            hideBackdrop
            anchor="bottom"
            onClose={() => onClose()}
            sx={sx}
        >
            <DrawerTitleContainer>
                <IconButton
                    size={BUTTON_SIZE.LARGE}
                    type={BUTTON_TYPE.TEXT}
                    style={{ position: 'absolute', left: 0 }}
                    onClick={() => onClose()}
                >
                    <CloseIcon />
                </IconButton>
                <H6 margin={0}>{title}</H6>
            </DrawerTitleContainer>
            <Box overflow="hidden" padding={3} flex={1}>
                <Scheduler {...schedulerProps} />
            </Box>
        </Drawer>
    );
};

const Drawer = styled(MuiDrawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderTopRightRadius: theme.shape.borderRadius,
        borderTopLeftRadius: theme.shape.borderRadius,
    },
}));

const DrawerTitleContainer = styled(CenteredContainer)(({ theme }) => ({
    padding: theme.spacing(9, 6),
    position: 'relative',
    textAlign: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '& svg': {
        color: theme.palette.text.primary,
    },
}));
