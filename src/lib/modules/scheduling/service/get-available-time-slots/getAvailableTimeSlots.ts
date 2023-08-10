import { GetAvailableTimeSlots } from '@/lib/modules/scheduling/features';
import { SchedulingServiceParams } from '../params';
import { getAvailability } from './utils/getAvailability';
import { AvailabilityWindow } from './types';
import { collapseOverlapingEventWindows } from './utils/collapseOverlapingEventWindows';
import { endOfDay, startOfDay } from 'date-fns';
import { getAvailabilityWindowsForTimeOfDay } from './utils/getAvailabilityWindowsForTimeOfDay';
// TODO: cap maximum future booking window (ex. 2 months in advance)
// TODO: These will be provider preferences
const providerAvailabilityWindows: AvailabilityWindow[] = [
    {
        dayOfWeek: 'Monday',
        startTime: '08:00:00',
        endTime: '17:00:00',
    },
    {
        dayOfWeek: 'Tuesday',
        startTime: '08:00:00',
        endTime: '17:00:00',
    },
    {
        dayOfWeek: 'Wednesday',
        startTime: '08:00:00',
        endTime: '17:00:00',
    },
    {
        dayOfWeek: 'Thursday',
        startTime: '08:00:00',
        endTime: '17:00:00',
    },
    {
        dayOfWeek: 'Friday',
        startTime: '08:00:00',
        endTime: '17:00:00',
    },
];
const timeZone = 'America/Chicago';
const timeOfDayWindows = {
    morning: {
        startTime: '04:00:00',
        endTime: '12:00:00',
    },
    afternoon: {
        startTime: '12:00:00',
        endTime: '17:00:00',
    },
    evening: {
        startTime: '17:00:00',
        endTime: '21:00:00',
    },
};

export const factory =
    ({ prisma, nylas }: SchedulingServiceParams) =>
    async ({
        userId,
        startDate,
        endDate,
        timeOfDay,
    }: GetAvailableTimeSlots.Input): Promise<{
        availability: GetAvailableTimeSlots.Output['availability'];
    }> => {
        const calendarAccess = await prisma.calendarAccess.findMany({
            where: {
                userId,
            },
        });

        const eventsByCalendar = await Promise.all(
            calendarAccess.map(async ({ accessToken, emailAddress: email }) => {
                // TODO: store calendar ids on calendar access
                const { calendars } = await nylas.getCalendars({ accessToken });
                const emailCalendar = calendars.find(
                    (calendar) => calendar.isPrimary
                );
                if (!emailCalendar) {
                    throw new Error('Calendar not found for email ' + email);
                }
                const { events } = await nylas.getEventsByCalendar({
                    accessToken,
                    calendarId: emailCalendar.id as string,
                    startsAfter: startOfDay(new Date(startDate)).toISOString(),
                    endsBefore: endOfDay(new Date(endDate)).toISOString(),
                });
                return events ?? [];
            })
        );
        const sortedEvents = eventsByCalendar
            .flatMap((calendarEvents) => {
                return calendarEvents.map((event) => ({
                    start: event.when.startTime,
                    end: event.when.endTime,
                }));
            })
            .sort((a, b) => a.start - b.start);
        const availabilityWindows =
            timeOfDay && timeOfDayWindows[timeOfDay]
                ? getAvailabilityWindowsForTimeOfDay(
                      timeOfDayWindows[timeOfDay],
                      providerAvailabilityWindows
                  )
                : providerAvailabilityWindows;
        return {
            availability: getAvailability({
                events: collapseOverlapingEventWindows(sortedEvents),
                availabilityWindows,
                timeZone,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            }),
        };
    };
