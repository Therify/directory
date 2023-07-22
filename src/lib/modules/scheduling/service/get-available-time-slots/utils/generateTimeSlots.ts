import { isAfter, isBefore, addMinutes, isSameMinute } from 'date-fns';
import { TimeSlot } from '../types';

interface GenerateSlotParams {
    timeWindow: TimeSlot;
    events: TimeSlot[]; // Events must be sorted by start time!
    timeIntervalMinutes?: number;
}

export const generateTimeSlots = ({
    timeWindow,
    events,
    timeIntervalMinutes = 15,
}: GenerateSlotParams): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    let eventIndex = 0;
    let currentSlot: TimeSlot = {
        start: getSlotStart(timeWindow.start, timeIntervalMinutes),
        end: getSlotEnd(timeWindow.start, timeIntervalMinutes),
    };

    while (isSlotInWindow(currentSlot, timeWindow)) {
        const event = events[eventIndex];
        if (event && isOverlap(currentSlot, event)) {
            const nextSlotStart = getSlotStart(event.end, timeIntervalMinutes);
            currentSlot = {
                start: nextSlotStart,
                end: getSlotEnd(nextSlotStart, timeIntervalMinutes),
            };
            // Find next event that starts after current event ends
            const nextEventIndex = events
                .slice(eventIndex + 1)
                .findIndex(
                    (event) =>
                        isAfter(event.start, nextSlotStart) ||
                        isSameMinute(event.start, nextSlotStart)
                );
            eventIndex =
                nextEventIndex === -1 ? -1 : eventIndex + nextEventIndex + 1;
            continue;
        }
        slots.push(currentSlot);
        currentSlot = {
            start: currentSlot.end,
            end: getSlotEnd(currentSlot.end, timeIntervalMinutes),
        };
    }
    return slots;
};

const roundToNearestMinutes = (time: number, timeIntervalMinutes: number) => {
    var timeToReturn = new Date(time);

    timeToReturn.setMilliseconds(0);
    timeToReturn.setSeconds(0);
    timeToReturn.setMinutes(
        Math.ceil(timeToReturn.getMinutes() / timeIntervalMinutes) *
            timeIntervalMinutes
    );
    return timeToReturn;
};

const getSlotStart = (start: number, timeIntervalMinutes: number) =>
    roundToNearestMinutes(start, timeIntervalMinutes).getTime();

const getSlotEnd = (start: number, timeIntervalMinutes: number) =>
    addMinutes(start, timeIntervalMinutes).getTime();

const isSlotInWindow = (slot: TimeSlot, window: TimeSlot) => {
    const isStartInWindow =
        isAfter(slot.start, window.start) ||
        isSameMinute(slot.start, window.start);
    const isEndInWindow =
        isBefore(slot.end, window.end) || isSameMinute(slot.end, window.end);
    return isStartInWindow && isEndInWindow;
};

const isOverlap = (slot: TimeSlot, event: TimeSlot): boolean => {
    const eventStartsInSlot =
        (isAfter(event.start, slot.start) ||
            isSameMinute(slot.start, event.start)) &&
        isBefore(event.start, slot.end);
    const eventEndsInSlot =
        (isAfter(event.end, slot.start) || isSameMinute(slot.end, event.end)) &&
        isBefore(event.end, slot.end);
    const eventOverlapsEntireSlot =
        isBefore(event.start, slot.start) && isAfter(event.end, slot.end);
    const isSameLength =
        isSameMinute(slot.start, event.start) &&
        isSameMinute(slot.end, event.end);
    return (
        eventStartsInSlot ||
        eventEndsInSlot ||
        eventOverlapsEntireSlot ||
        isSameLength
    );
};
