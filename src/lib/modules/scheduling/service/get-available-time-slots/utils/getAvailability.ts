import { zonedTimeToUtc, formatInTimeZone } from 'date-fns-tz';
import { TimeSlot, AvailabilityWindow } from '../types';
import { generateTimeSlots } from './generateTimeSlots';
import { doesTimeSlotOverlapWindow } from './doesTimeSlotOverlapWindow';
import { addDays, intervalToDuration } from 'date-fns';

interface GetEventsByAvailabilityWindowsParams {
    events: TimeSlot[];
    availabilityWindows: AvailabilityWindow[];
    timeZone: string;
    startDate: Date;
    endDate: Date;
}
export const getAvailability = ({
    events,
    availabilityWindows,
    timeZone,
    startDate,
    endDate,
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

    let availability: TimeSlot[] = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
        const date = formatInTimeZone(currentDate, timeZone, 'yyyy-MM-dd');
        const events = eventsByDate[date] ?? [];
        const dayOfWeek = formatInTimeZone(currentDate, timeZone, 'EEEE');
        const windows = windowsByDayOfWeek[dayOfWeek];
        if (!windows) {
            currentDate = addDays(currentDate, 1);
            continue;
        }
        const availableTimeSlots = windows.flatMap((window) => {
            const timeWindow = {
                start: zonedTimeToUtc(
                    `${date} ${window.startTime}`,
                    timeZone
                ).getTime(),
                end: zonedTimeToUtc(
                    `${date} ${window.endTime}`,
                    timeZone
                ).getTime(),
            };
            return generateTimeSlots({
                slotStartIntervalMinutes: 15,
                slotLengthMinutes: 15,
                timeWindow,
                events: events.filter((event) =>
                    doesTimeSlotOverlapWindow(event, timeWindow)
                ),
            });
        });
        availability = [...availability, ...availableTimeSlots];
        currentDate = addDays(currentDate, 1);
    }
    return availability;
};
