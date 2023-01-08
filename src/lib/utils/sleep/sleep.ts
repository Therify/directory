/**
 * Pauses the execution of the current thread for the specified duration
 * @param duration - The duration to sleep in milliseconds
 * @returns
 */
export function sleep(duration = 1_000) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}
