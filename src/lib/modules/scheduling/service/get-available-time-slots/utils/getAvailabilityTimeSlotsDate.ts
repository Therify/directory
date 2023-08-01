import { utcToZonedTime, formatInTimeZone } from 'date-fns-tz';
import { TimeSlot, AvailabilityWindow } from '../types';
import { generateTimeSlots } from './generateTimeSlots';
import { doesTimeSlotOverlapWindow } from './doesTimeSlotOverlapWindow';

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
    const windowsByDayOfWeek = supportedDaysOfWeek.reduce<{
        [dayOfWeek: string]: AvailabilityWindow[];
    }>((acc, dayOfWeek) => {
        const windows = availabilityWindows.filter(
            (window) => window.dayOfWeek === dayOfWeek
        );
        return {
            ...acc,
            [dayOfWeek]: windows,
        };
    }, {});
    // Sort events by date accounting for timezone
    const eventsByDate = events.reduce<{ [timeZoneDate: string]: TimeSlot[] }>(
        (acc, event) => {
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
        },
        {}
    );

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
                    slotStartIntervalMinutes: 5,
                    slotLengthMinutes: 15,
                    timeWindow,
                    events: events.filter((event) =>
                        doesTimeSlotOverlapWindow(event, timeWindow)
                    ),
                });
            });

            return [...acc, ...availableTimeSlots];
        },
        [] as TimeSlot[]
    );
    return availableTimeSlotsByDate;
};
