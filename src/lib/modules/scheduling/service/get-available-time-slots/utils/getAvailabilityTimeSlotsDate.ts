import { utcToZonedTime, formatInTimeZone } from 'date-fns-tz';
import { TimeSlot, AvailabilityWindow } from '../types';
import { isAfter, isBefore, isSameMinute } from 'date-fns';
import { generateTimeSlots } from './generateTimeSlots';

interface GetEventsByAvailabilityWindowsParams {
    events: TimeSlot[];
    availabilityWindows: AvailabilityWindow[];
    timeZone: string;
}
export const getAvailabilityTimeSlotsDate = ({
    events,
    availabilityWindows,
    timeZone,
}: GetEventsByAvailabilityWindowsParams) => {
    const supportedDaysOfWeek = Array.from(
        new Set(availabilityWindows.map((window) => window.dayOfWeek))
    );
    const windowsByDayOfWeek = supportedDaysOfWeek.reduce((acc, dayOfWeek) => {
        const windows = availabilityWindows.filter(
            (window) => window.dayOfWeek === dayOfWeek
        );
        return {
            ...acc,
            [dayOfWeek]: windows,
        };
    }, {} as Record<string, AvailabilityWindow[]>);
    // Sort events by day of week
    const eventsByDate = events.reduce((acc, event) => {
        // const dayOfWeek = format(utcToZonedTime(event.start, timeZone), 'EEEE')
        const date = formatInTimeZone(event.start, timeZone, 'yyyy-MM-dd');
        if (acc[date] === undefined) {
            return {
                ...acc,
                [date]: [event],
            };
        }

        return {
            ...acc,
            [date]: [...acc[date], event],
        };
    }, {} as Record<string, TimeSlot[]>);

    const availableTimeSlotsByDate = Object.entries(eventsByDate).reduce(
        (acc, [date, events]) => {
            const dayOfWeek = formatInTimeZone(
                events[0].start,
                timeZone,
                'EEEE'
            );
            const windows = windowsByDayOfWeek[dayOfWeek];
            if (!windows) {
                return acc;
            }
            const availableTimeSlots = windows.flatMap((window) => {
                const timeWindow = {
                    start: utcToZonedTime(
                        `${date} ${window.startTime}`,
                        timeZone
                    ).getTime(),
                    end: utcToZonedTime(
                        `${date} ${window.endTime}`,
                        timeZone
                    ).getTime(),
                };
                return generateTimeSlots({
                    timeIntervalMinutes: 15,
                    timeWindow,
                    events: events.filter(
                        (event) =>
                            isAfter(event.start, timeWindow.start) ||
                            isBefore(event.end, timeWindow.end) ||
                            isSameMinute(event.start, timeWindow.start) ||
                            isSameMinute(event.end, timeWindow.end)
                    ),
                });
            });

            return [...acc, ...availableTimeSlots];
        },
        [] as TimeSlot[]
    );
    console.log({
        supportedDaysOfWeek,
        windowsByDayOfWeek,
        eventsByDate,
        availableTimeSlotsByDate,
    });
    return availableTimeSlotsByDate;
};
