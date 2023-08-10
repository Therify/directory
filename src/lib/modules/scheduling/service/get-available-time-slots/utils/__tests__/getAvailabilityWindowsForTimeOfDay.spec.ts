import { AvailabilityWindow } from '../../types';
import { getAvailabilityWindowsForTimeOfDay } from '../getAvailabilityWindowsForTimeOfDay';

describe('getAvailabilityWindowsForTimeOfDay', () => {
    it('should return the entire availability window when smaller than time of day window', () => {
        const timeOfDayWindow = {
            startTime: '08:00:00',
            endTime: '10:00:00',
        };
        const availabilityWindows: AvailabilityWindow[] = [
            {
                dayOfWeek: 'Monday',
                startTime: '09:00:00',
                endTime: '10:00:00',
            },
        ];
        expect(
            getAvailabilityWindowsForTimeOfDay(
                timeOfDayWindow,
                availabilityWindows
            )
        ).toEqual(availabilityWindows);
    });

    it('should return the entire time of day window when smaller than availability window', () => {
        const timeOfDayWindow = {
            startTime: '08:00:00',
            endTime: '10:00:00',
        };
        const availabilityWindows: AvailabilityWindow[] = [
            {
                dayOfWeek: 'Monday',
                startTime: '07:00:00',
                endTime: '11:00:00',
            },
        ];
        expect(
            getAvailabilityWindowsForTimeOfDay(
                timeOfDayWindow,
                availabilityWindows
            )
        ).toEqual([
            {
                dayOfWeek: 'Monday',
                startTime: timeOfDayWindow.startTime,
                endTime: timeOfDayWindow.endTime,
            },
        ]);
    });

    it('should return the later start time intersection', () => {
        const timeOfDayWindow = {
            startTime: '08:00:00',
            endTime: '12:00:00',
        };
        const availabilityWindows: AvailabilityWindow[] = [
            {
                dayOfWeek: 'Monday',
                startTime: '09:00:00',
                endTime: '11:00:00',
            },
        ];
        expect(
            getAvailabilityWindowsForTimeOfDay(
                timeOfDayWindow,
                availabilityWindows
            )
        ).toEqual([
            {
                dayOfWeek: 'Monday',
                startTime: '09:00:00',
                endTime: '11:00:00',
            },
        ]);
    });

    it('should return the earlier end time intersection', () => {
        const timeOfDayWindow = {
            startTime: '08:00:00',
            endTime: '12:00:00',
        };
        const availabilityWindows: AvailabilityWindow[] = [
            {
                dayOfWeek: 'Monday',
                startTime: '09:00:00',
                endTime: '13:00:00',
            },
        ];
        expect(
            getAvailabilityWindowsForTimeOfDay(
                timeOfDayWindow,
                availabilityWindows
            )
        ).toEqual([
            {
                dayOfWeek: 'Monday',
                startTime: '09:00:00',
                endTime: '12:00:00',
            },
        ]);
    });
});
