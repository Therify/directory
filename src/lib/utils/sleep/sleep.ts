/**
 * Sleeps for a given duration in milliseconds.
 * @param duration - The duration in milliseconds to sleep for. Defaults to 1 second.
 * @returns A promise that resolves after the given duration.
 */
export function sleep(duration = 1_000) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}
