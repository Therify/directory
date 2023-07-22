import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import {
    ErrorOutline as ErrorIcon,
    ChevronLeftRounded as LeftIcon,
    ChevronRightRounded as RightIcon,
} from '@mui/icons-material';
import {
    Divider,
    IconButton,
    BUTTON_TYPE,
    BUTTON_SIZE,
    Button,
    Paragraph,
} from '@/lib/shared/components/ui';
import { TimeSlot } from './types';
import { DateColumn, LoadingColumn } from './ui';
import { format, isSameDay } from 'date-fns';

export interface SchedulerProps {
    timeSlots?: TimeSlot[];
    isLoading?: boolean;
    paginationSize?: number;
    defaultVisibleTimesCount?: number;
    disabled?: boolean;
    headerSlot?: React.ReactNode;
    error?: string;
    isScheduling?: boolean;
    onSchedule: (timeSlot: TimeSlot) => void;
    children?: React.ReactNode;
}
type TimeSlotDay = TimeSlot[];

export const Scheduler = ({
    timeSlots = [],
    isLoading,
    headerSlot,
    disabled,
    paginationSize = 3,
    defaultVisibleTimesCount = 3,
    error,
    isScheduling,
    onSchedule,
    children,
}: SchedulerProps) => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [paginatedDays, setPaginatedDays] = useState<TimeSlotDay[][]>([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<
        TimeSlot | undefined
    >(timeSlots[0]);
    const handlePageChange = (direction: 'next' | 'prev') => {
        if (direction === 'next') {
            const next =
                page + 1 < paginatedDays.length
                    ? page + 1
                    : paginatedDays.length - 1;
            return setPage(next);
        }

        const prev = page - 1 >= 0 ? page - 1 : 0;
        return setPage(prev);
    };

    useEffect(() => {
        if (timeSlots.length === 0) {
            setPaginatedDays([]);
            return;
        }
        const paginationStep =
            Math.abs(paginationSize) > 0 ? Math.abs(paginationSize) : 1;
        const slotsByDay: TimeSlotDay[] = [];
        let day: TimeSlot[] = [timeSlots[0]];
        for (let i = 1; i < timeSlots.length; i++) {
            const currentTimeSlot = timeSlots[i];
            const daySlotIndex = day.length - 1;
            const lastDaySlot = day[daySlotIndex];
            if (isSameDay(lastDaySlot.start, currentTimeSlot.start)) {
                day.push(currentTimeSlot);
            } else {
                slotsByDay.push(day);
                day = [currentTimeSlot];
            }
        }

        if (day.length > 0) {
            slotsByDay.push(day);
        }

        const paginatedDays: TimeSlotDay[][] = [];
        for (let j = 0; j < slotsByDay.length; j += paginationStep) {
            paginatedDays.push(slotsByDay.slice(j, j + paginationStep));
        }
        setPaginatedDays(paginatedDays);
    }, [timeSlots, paginationSize]);

    const TimeSlots =
        timeSlots.length === 0 ? (
            <NoTimeSlotsContainer>
                <Paragraph> No time slots available.</Paragraph>
            </NoTimeSlotsContainer>
        ) : (
            paginatedDays[page]?.map((timeSlots, index) => (
                <DateColumn
                    key={index}
                    timeSlots={timeSlots}
                    defaultVisibleTimesCount={Math.abs(
                        defaultVisibleTimesCount
                    )}
                    selectedTimeSlot={selectedTimeSlot}
                    onSlotSelection={(selection) =>
                        setSelectedTimeSlot(selection)
                    }
                />
            ))
        );

    return (
        <SchedulerContainer>
            {headerSlot && <HeaderContainer>{headerSlot}</HeaderContainer>}
            <SchedulerBody>
                {error ? (
                    <Box margin={theme.spacing(6, 0)} display="flex">
                        <ErrorIcon
                            color="error"
                            style={{ marginRight: theme.spacing(3) }}
                        />
                        <Paragraph color="error">{error}</Paragraph>
                    </Box>
                ) : (
                    <>
                        <IconButton
                            color="info"
                            disabled={disabled || isLoading || page === 0}
                            type={BUTTON_TYPE.TEXT}
                            size={BUTTON_SIZE.SMALL}
                            style={{ marginTop: theme.spacing(3) }}
                            onClick={() => handlePageChange('prev')}
                        >
                            <LeftIcon />
                        </IconButton>
                        <DateContainer paginationSize={paginationSize}>
                            {isLoading
                                ? Array.from(Array(paginationSize).keys()).map(
                                      (key) => (
                                          <LoadingColumn
                                              key={key}
                                              defaultVisibleTimesCount={Math.abs(
                                                  defaultVisibleTimesCount
                                              )}
                                          />
                                      )
                                  )
                                : TimeSlots}
                        </DateContainer>
                        <IconButton
                            color="info"
                            disabled={
                                isLoading || page >= paginatedDays.length - 1
                            }
                            type={BUTTON_TYPE.TEXT}
                            size={BUTTON_SIZE.SMALL}
                            style={{ marginTop: theme.spacing(3) }}
                            onClick={() => handlePageChange('next')}
                        >
                            <RightIcon />
                        </IconButton>
                    </>
                )}
            </SchedulerBody>
            <Button
                isLoading={isLoading || isScheduling}
                disabled={isLoading || Boolean(error) || !selectedTimeSlot}
                onClick={() => {
                    if (selectedTimeSlot) onSchedule(selectedTimeSlot);
                }}
                style={{ margin: theme.spacing(3, 0, 9) }}
            >
                {selectedTimeSlot
                    ? `Book video call for ${format(
                          selectedTimeSlot.start,
                          'MMM d'
                      )}`
                    : 'Select a time slot'}
            </Button>
            {children && (
                <FooterContainer>
                    <Divider style={{ margin: theme.spacing(0, 0, 7, 0) }} />
                    {children}
                </FooterContainer>
            )}
        </SchedulerContainer>
    );
};

const SchedulerContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
}));

const HeaderContainer = styled(Box)(() => ({}));
const FooterContainer = styled(Box)(() => ({}));

const DateContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'paginationSize',
})<{ paginationSize: number }>(({ theme, paginationSize }) => ({
    flexGrow: 1,
    display: 'flex',
    alignItems: 'flex-start',
    overflow: 'hidden',
    height: '100%',
    '& > *': {
        width: `${100 / paginationSize}%`,
        marginRight: theme.spacing(3),
    },
}));
const SchedulerBody = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'flex-start',
    '& > *:last-child': {
        marginRight: 0,
    },
}));

const NoTimeSlotsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: theme.spacing(6),
}));
