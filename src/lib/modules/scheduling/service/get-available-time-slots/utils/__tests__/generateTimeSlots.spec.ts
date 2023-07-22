import { addMinutes, addHours, subMinutes } from 'date-fns';
import { generateTimeSlots } from '../generateTimeSlots';

describe('generateTimeSlots', () => {
    const timeIntervalMinutes = 15;
    const startingTime = new Date('2021-01-01T12:00:00.000Z').getTime();
    const mockWindow = {
        start: startingTime,
        end: addHours(startingTime, 1).getTime(),
    };
    const firstQuarterOfHour = {
        start: startingTime,
        end: addMinutes(startingTime, timeIntervalMinutes).getTime(),
    };
    const secondQuarterOfHour = {
        start: addMinutes(startingTime, timeIntervalMinutes).getTime(),
        end: addMinutes(startingTime, timeIntervalMinutes * 2).getTime(),
    };
    const thirdQuarterOfHour = {
        start: addMinutes(startingTime, timeIntervalMinutes * 2).getTime(),
        end: addMinutes(startingTime, timeIntervalMinutes * 3).getTime(),
    };
    const fourthQuarterOfHour = {
        start: addMinutes(startingTime, timeIntervalMinutes * 3).getTime(),
        end: addMinutes(startingTime, timeIntervalMinutes * 4).getTime(),
    };

    it('should generate slots', () => {
        const slots = generateTimeSlots({
            timeIntervalMinutes,
            timeWindow: mockWindow,
            events: [],
        });
        expect(slots).toEqual([
            firstQuarterOfHour,
            secondQuarterOfHour,
            thirdQuarterOfHour,
            fourthQuarterOfHour,
        ]);
    });

    it('should subtract overlapping event slots', () => {
        const slots = generateTimeSlots({
            timeIntervalMinutes,
            timeWindow: mockWindow,
            events: [secondQuarterOfHour],
        });
        expect(slots).toEqual([
            firstQuarterOfHour,
            thirdQuarterOfHour,
            fourthQuarterOfHour,
        ]);
    });

    it('should handle subtracting multiple events', () => {
        const slots = generateTimeSlots({
            timeIntervalMinutes,
            timeWindow: mockWindow,
            events: [secondQuarterOfHour, fourthQuarterOfHour],
        });

        expect(slots).toEqual([firstQuarterOfHour, thirdQuarterOfHour]);
    });

    it('should round up end times when starting next slot (ex. if using 15 min intervals, a 10:05 end time would convert to a 10:15 start for next slot)', () => {
        const slots = generateTimeSlots({
            timeIntervalMinutes,
            timeWindow: mockWindow,
            events: [
                {
                    start: secondQuarterOfHour.start,
                    end: addMinutes(secondQuarterOfHour.start, 25).getTime(),
                },
            ],
        });

        expect(slots).toEqual([firstQuarterOfHour, fourthQuarterOfHour]);
    });

    it('should return no available time slots when provided event that covers entire time window', () => {
        const slots = generateTimeSlots({
            timeIntervalMinutes,
            timeWindow: mockWindow,
            events: [
                {
                    start: subMinutes(mockWindow.start, 10).getTime(),
                    end: addMinutes(mockWindow.end, 10).getTime(),
                },
            ],
        });

        expect(slots).toEqual([]);
    });
});
