import { AvailabilityWindow } from '../types';
import { doesTimeSlotOverlapWindow } from './doesTimeSlotOverlapWindow';

export const getAvailabilityWindowsForTimeOfDay = (
    timeOfDayWindow: Omit<AvailabilityWindow, 'dayOfWeek'>,
    availabilityWindows: AvailabilityWindow[]
): AvailabilityWindow[] => {
    const todWindowStart = getDate(timeOfDayWindow.startTime);
    const todWindowEnd = getDate(timeOfDayWindow.endTime);
    return availabilityWindows.reduce<AvailabilityWindow[]>((acc, window) => {
        const availabilityWindowStart = getDate(window.startTime);
        const availabilityWindowEnd = getDate(window.endTime);
        if (
            !doesTimeSlotOverlapWindow(
                {
                    start: availabilityWindowStart.getTime(),
                    end: availabilityWindowEnd.getTime(),
                },
                {
                    start: todWindowStart.getTime(),
                    end: todWindowEnd.getTime(),
                }
            )
        ) {
            return acc;
        }
        const start =
            availabilityWindowStart > todWindowStart
                ? availabilityWindowStart
                : todWindowStart;
        const end =
            availabilityWindowEnd < todWindowEnd
                ? availabilityWindowEnd
                : todWindowEnd;

        return [
            ...acc,
            {
                ...window,
                startTime: getWindowTime(start),
                endTime: getWindowTime(end),
            },
        ];
    }, []);
};

const getDate = (time: string) => {
    return new Date(`1970-01-01T${time}.000Z`);
};

const getWindowTime = (date: Date) => {
    return date.toISOString().split('T')[1].split('.')[0];
};
