import { isAfter, isBefore, isSameMinute } from 'date-fns';
import { TimeSlot } from '../types';

export const doesTimeSlotOverlapWindow = (
    slot: TimeSlot,
    timeWindow: TimeSlot
) => {
    const isStartInWindow =
        isSameMinute(slot.start, timeWindow.start) ||
        (isAfter(slot.start, timeWindow.start) &&
            isBefore(slot.start, timeWindow.end));
    const isEndInWindow =
        isSameMinute(slot.end, timeWindow.end) ||
        (isBefore(slot.end, timeWindow.end) &&
            isAfter(slot.end, timeWindow.start));
    const doesEventCoverWindow =
        isBefore(slot.start, timeWindow.start) &&
        isAfter(slot.end, timeWindow.end);

    return isStartInWindow || isEndInWindow || doesEventCoverWindow;
};
