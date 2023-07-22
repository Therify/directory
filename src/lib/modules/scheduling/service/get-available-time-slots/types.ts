export type TimeSlot = {
    start: number;
    end: number;
};

export type AvailabilityWindow = {
    dayOfWeek:
        | 'Monday'
        | 'Tuesday'
        | 'Wednesday'
        | 'Thursday'
        | 'Friday'
        | 'Saturday'
        | 'Sunday';
    startTime: string;
    endTime: string;
};
