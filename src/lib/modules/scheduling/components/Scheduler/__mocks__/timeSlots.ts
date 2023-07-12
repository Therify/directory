import { TimeSlot } from '../types';
import { addDays, addHours } from 'date-fns';

export const generateMockTimes = (
    numOfDays: number,
    numOfSlotsPerDay: number
): TimeSlot[] => {
    const baseDate = new Date().setHours(8, 0, 0, 0);
    const times: TimeSlot[] = [];
    for (let i = 0; i < numOfDays; i++) {
        const date = addDays(baseDate, i);

        for (let j = 0; j < numOfSlotsPerDay; j++) {
            times.push({
                start: addHours(date, j),
                duration: 60,
            });
        }
    }
    return times;
};
