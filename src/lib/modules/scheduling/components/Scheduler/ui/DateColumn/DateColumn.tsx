import { format } from 'date-fns';
import { Skeleton, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    VideoCameraFrontOutlined as VideoIcon,
    VideoCameraFrontRounded as VideoIconFilled,
} from '@mui/icons-material';
import {
    Paragraph,
    PARAGRAPH_SIZE,
    Overline,
    OVERLINE_SIZE,
} from '@/lib/shared/components/ui';
import { TimeSlot as ITimeSlot } from '../../types';
import { useEffect, useState } from 'react';

interface DateColumnProps {
    isLoading?: boolean;
    timeSlots: ITimeSlot[];
    selectedTimeSlot?: ITimeSlot;
    defaultVisibleTimesCount?: number;
    onSlotSelection: (selection: ITimeSlot) => void;
}

export const DateColumn = ({
    timeSlots,
    selectedTimeSlot,
    defaultVisibleTimesCount = 3,
    onSlotSelection,
}: DateColumnProps) => {
    const day = timeSlots[0].start;
    const [showMoreTimes, setShowMoreTimes] = useState(false);
    const condensedTimes = timeSlots.slice(0, defaultVisibleTimesCount);

    useEffect(() => {
        setShowMoreTimes(false);
    }, [timeSlots]);

    return (
        <DateContainer>
            <DateHeader>
                <DayOfWeek size={OVERLINE_SIZE.SMALL}>
                    {format(day, 'eee')}
                </DayOfWeek>
                <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                    {format(day, 'MMM d')}
                </Paragraph>
            </DateHeader>
            <TimeSlotContainer>
                <TimeSlots
                    slots={showMoreTimes ? timeSlots : condensedTimes}
                    selectedTimeSlot={selectedTimeSlot}
                    onSlotClick={onSlotSelection}
                />
                {!showMoreTimes &&
                    timeSlots.length > defaultVisibleTimesCount && (
                        <TimeSlot
                            isSelected={false}
                            onClick={() => setShowMoreTimes(true)}
                        >
                            <Time>More</Time>
                        </TimeSlot>
                    )}
            </TimeSlotContainer>
        </DateContainer>
    );
};

const TimeSlots = ({
    slots,
    selectedTimeSlot,
    onSlotClick,
}: {
    slots: DateColumnProps['timeSlots'];
    selectedTimeSlot: DateColumnProps['selectedTimeSlot'];
    onSlotClick: DateColumnProps['onSlotSelection'];
}) => {
    return (
        <>
            {slots.map((slot, index) => {
                const isSelected =
                    selectedTimeSlot?.start.getTime() === slot.start.getTime();
                return (
                    <TimeSlot
                        key={index}
                        isSelected={isSelected}
                        onClick={() => onSlotClick(slot)}
                    >
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Time>{format(slot.start, 'h:mmaaa')}</Time>
                            {isSelected ? (
                                <VideoIconFilled />
                            ) : (
                                <VideoIcon color="primary" />
                            )}
                        </Box>
                        {isSelected && <Duration>{slot.duration} min</Duration>}
                    </TimeSlot>
                );
            })}
        </>
    );
};

export const LoadingColumn = ({
    defaultVisibleTimesCount,
}: {
    defaultVisibleTimesCount: number;
}) => {
    const TimeSlotLoaders = Array.from(
        Array(defaultVisibleTimesCount).keys()
    ).map((key) => <SkeletonTimeSlot key={key} />);
    return (
        <DateContainer>
            <DateHeader>
                <SkeletonTitle width="25%" />
                <SkeletonTitle width="45%" />
            </DateHeader>
            <TimeSlotContainer>{TimeSlotLoaders}</TimeSlotContainer>
        </DateContainer>
    );
};

const SkeletonTitle = styled(Skeleton, {
    shouldForwardProp: (prop) => prop !== 'width',
})<{ width: string }>(({ theme, width }) => ({
    width,
    height: '26px',
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
}));

const SkeletonTimeSlot = styled(Skeleton)(({ theme }) => ({
    height: '46px',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
}));

const DateContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
}));

const DateHeader = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
}));

const DayOfWeek = styled(Overline)(({ theme }) => ({
    color: theme.palette.grey[500],
}));

const TimeSlotContainer = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    overflow: 'scroll',
    scrollPadding: '0',
    scrollSnapType: 'y mandatory',
    height: '100%',
    scrollbarWidth: 'none',
    overscrollBehaviorY: 'contain',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    '&:last-child': {
        marginBottom: theme.spacing(6),
    },
}));

const TimeSlot = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
    padding: theme.spacing(2, 1),
    whiteSpace: 'nowrap',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    scrollSnapAlign: 'end',
    scrollMarginBottom: theme.spacing(6),
    transition: theme.transitions.create(['background-color']),
    marginBottom: theme.spacing(2),
    '& svg': {
        fontSize: '1.25rem',
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    ...(isSelected && {
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        '& p': {
            color: theme.palette.primary.contrastText,
        },
        '& svg': {
            color: theme.palette.primary.contrastText,
            fontSize: '1.25rem',
        },
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    }),
}));

const Time = styled(Paragraph)(({ theme }) => ({
    color: theme.palette.grey[500],
    margin: 0,
    marginRight: theme.spacing(2),
    fontSize: theme.typography.body1.fontSize,
    fontWeight: 500,
    textAlign: 'center',
}));

const Duration = styled(Paragraph)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    margin: 0,
    fontSize: theme.typography.body1.fontSize,
    textAlign: 'center',
}));
