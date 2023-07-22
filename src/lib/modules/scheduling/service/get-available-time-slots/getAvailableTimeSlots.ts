import { GetAvailableTimeSlots } from '@/lib/modules/scheduling/features';
import { SchedulingServiceParams } from '../params';
import { getAvailabilityTimeSlotsDate } from './utils/getAvailabilityTimeSlotsDate';
import { AvailabilityWindow } from './types';

// TODO: These will be provider preferences
const availabilityWindows: AvailabilityWindow[] = [
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

export const factory =
    ({ prisma, nylas }: SchedulingServiceParams) =>
    async ({
        userId,
        emailAddress,
    }: GetAvailableTimeSlots.Input): Promise<
        {
            availability: GetAvailableTimeSlots.Output['availability'];
        } & any
    > => {
        const calendarAccess = await prisma.calendarAccess.findMany({
            where: {
                userId,
                emailAddress,
            },
        });

        const eventsByCalendar = await Promise.all(
            calendarAccess.map(async ({ accessToken, emailAddress: email }) => {
                const { calendars } = await nylas.getCalendars({ accessToken });
                console.log(calendars);
                const emailCalendar = calendars.find(
                    (calendar) => calendar.name === email
                );
                if (!emailCalendar) {
                    throw new Error('Calendar not found for email ' + email);
                }
                const { events } = await nylas.getEventsByCalendar({
                    accessToken,
                    calendarId: emailCalendar.id as string,
                });
                return events;
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
        // Calculate 15 minute intervals between 8am-5pm monday through friday
        // using a schedule interval algorithm
        // https://stackoverflow.com/questions/4678168/efficient-algorithm-for-a-calendar

        return {
            availability: getAvailabilityTimeSlotsDate({
                events: sortedEvents,
                availabilityWindows,
                timeZone,
            }),
        };
    };
