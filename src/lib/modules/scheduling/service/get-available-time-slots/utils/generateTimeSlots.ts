import { isAfter, isBefore, addMinutes, isSameMinute } from 'date-fns';
import { TimeSlot } from '../types';

interface GenerateSlotParams {
    timeWindow: TimeSlot;
    events?: TimeSlot[]; // Events must be sorted by start time!
    slotStartIntervalMinutes?: number;
    slotLengthMinutes: number;
}

export const generateTimeSlots = ({
    timeWindow,
    events = [],
    slotStartIntervalMinutes = 15,
    slotLengthMinutes,
}: GenerateSlotParams): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    let eventIndex = 0;
    let currentSlot: TimeSlot = {
        start: getSlotStart(timeWindow.start, slotStartIntervalMinutes),
        end: getSlotEnd(timeWindow.start, slotLengthMinutes),
    };
    while (isSlotInWindow(currentSlot, timeWindow)) {
        const event = events[eventIndex];
        if (event && isOverlap(currentSlot, event)) {
            const nextSlotStart = getSlotStart(
                event.end,
                slotStartIntervalMinutes
            );
            currentSlot = {
                start: nextSlotStart,
                end: getSlotEnd(nextSlotStart, slotLengthMinutes),
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
        const nextSlotStart = getSlotStart(
            addMinutes(currentSlot.start, slotStartIntervalMinutes).getTime(),
            slotStartIntervalMinutes
        );
        currentSlot = {
            start: nextSlotStart,
            end: getSlotEnd(nextSlotStart, slotLengthMinutes),
        };
    }
    return slots;
};

const roundToNextNearestMinutes = (
    time: number,
    slotStartIntervalMinutes: number
) => {
    var timeToReturn = new Date(time);

    timeToReturn.setMilliseconds(0);
    timeToReturn.setSeconds(0);
    timeToReturn.setMinutes(
        Math.ceil(timeToReturn.getMinutes() / slotStartIntervalMinutes) *
            slotStartIntervalMinutes
    );
    return timeToReturn;
};

const getSlotStart = (start: number, slotStartIntervalMinutes: number) =>
    roundToNextNearestMinutes(start, slotStartIntervalMinutes).getTime();

const getSlotEnd = (start: number, slotLengthMinutes: number) =>
    addMinutes(start, slotLengthMinutes).getTime();

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
