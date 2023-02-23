export const convertNestedDatesToISOString = (value: unknown): unknown => {
    if (value instanceof Date) {
        return value.toISOString();
    }

    if (Array.isArray(value)) {
        return value.map((value) => convertNestedDatesToISOString(value));
    }

    if (typeof value === 'object' && value !== null) {
        return Object.fromEntries(
            Object.entries(value).map(([key, value]) => [
                key,
                convertNestedDatesToISOString(value),
            ])
        );
    }

    return value;
};
