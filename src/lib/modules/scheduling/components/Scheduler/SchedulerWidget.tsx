import { Paper, styled, SxProps, Theme } from '@mui/material';
import {
    H3,
    Paragraph,
    H3Skeleton,
    ParagraphSkeleton,
} from '@/lib/shared/components/ui';
import { Scheduler, SchedulerProps } from './Scheduler';

interface SchedulerWidgetProps {
    title?: string;
    subtitle?: string;
    sx?: SxProps<Theme>;
}
export const SchedulerWidget = ({
    title,
    subtitle,
    children,
    isLoading,
    sx,
    ...schedulerProps
}: SchedulerWidgetProps & Omit<SchedulerProps, 'headerSlot'>) => {
    return (
        <SchedulerContainer sx={sx}>
            <Scheduler
                isLoading={isLoading}
                {...schedulerProps}
                headerSlot={
                    isLoading ? (
                        <>
                            <H3Skeleton />
                            <ParagraphSkeleton />
                        </>
                    ) : (
                        <>
                            {title && <SchedulerTitle>{title}</SchedulerTitle>}
                            {subtitle && (
                                <SchedulerSubtitle>
                                    {subtitle}
                                </SchedulerSubtitle>
                            )}
                        </>
                    )
                }
            >
                {!isLoading && !!schedulerProps.error && children}
            </Scheduler>
        </SchedulerContainer>
    );
};

const SchedulerContainer = styled(Paper)(({ theme }) => ({
    width: '100%',
    height: '100%',
    maxHeight: '860px',
    maxWidth: '585px',
    padding: theme.spacing(6),
    margin: theme.spacing(2, 4),
    boxShadow: theme.shadows[1],
}));

const SchedulerTitle = styled(H3)(({ theme }) => ({
    ...theme.typography.body3,
    fontWeight: 500,
    margin: 0,
}));

const SchedulerSubtitle = styled(Paragraph)(({ theme }) => ({
    color: theme.palette.info.main,
    marginBottom: theme.spacing(4),
}));
