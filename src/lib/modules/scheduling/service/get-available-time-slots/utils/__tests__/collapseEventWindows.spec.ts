import { collapseOverlapingEventWindows } from '../collapseOverlapingEventWindows';

describe('collapseOverlapingEventWindows', () => {
    it('should collapse overlapping events', () => {
        const events = [
            {
                start: new Date('2021-01-01T12:00:00.000Z').getTime(),
                end: new Date('2021-01-01T12:15:00.000Z').getTime(),
            },
            {
                start: new Date('2021-01-01T12:10:00.000Z').getTime(),
                end: new Date('2021-01-01T12:30:00.000Z').getTime(),
            },
        ];
        const result = collapseOverlapingEventWindows(events);
        expect(result).toEqual([
            { start: events[0].start, end: events[1].end },
        ]);
    });

    it('should collapse multiple overlapping events', () => {
        const events = [
            {
                start: new Date('2021-01-01T12:00:00.000Z').getTime(),
                end: new Date('2021-01-01T12:15:00.000Z').getTime(),
            },
            {
                start: new Date('2021-01-01T12:10:00.000Z').getTime(),
                end: new Date('2021-01-01T12:45:00.000Z').getTime(),
            },
            {
                start: new Date('2021-01-01T12:10:00.000Z').getTime(),
                end: new Date('2021-01-01T12:30:00.000Z').getTime(),
            },
            {
                start: new Date('2021-01-01T01:10:00.000Z').getTime(),
                end: new Date('2021-01-01T01:30:00.000Z').getTime(),
            },
        ];
        const result = collapseOverlapingEventWindows(events);
        expect(result).toEqual([
            { start: events[0].start, end: events[1].end },
            events[3],
        ]);
    });

    it('should maintain non overlapping events', () => {
        const events = [
            {
                start: new Date('2021-01-01T12:00:00.000Z').getTime(),
                end: new Date('2021-01-01T12:15:00.000Z').getTime(),
            },
            {
                start: new Date('2021-01-01T01:10:00.000Z').getTime(),
                end: new Date('2021-01-01T01:30:00.000Z').getTime(),
            },
        ];
        const result = collapseOverlapingEventWindows(events);
        expect(result).toEqual(events);
    });
});
