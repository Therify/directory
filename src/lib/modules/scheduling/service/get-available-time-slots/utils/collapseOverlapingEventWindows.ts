import { TimeSlot } from '../types';
import { doesTimeSlotOverlapWindow } from './doesTimeSlotOverlapWindow';

export const collapseOverlapingEventWindows = (
    sortedEvents: TimeSlot[]
): TimeSlot[] => {
    return sortedEvents.reduce<TimeSlot[]>((acc, event) => {
        if (acc.length === 0) {
            return [event];
        }

        const lastEvent = acc.pop();
        if (lastEvent && doesTimeSlotOverlapWindow(event, lastEvent)) {
            return [
                ...acc,
                {
                    start: Math.min(lastEvent.start, event.start),
                    end: Math.max(lastEvent.end, event.end),
                },
            ];
        }

        return lastEvent ? [...acc, lastEvent, event] : [...acc, event];
    }, []);
};
