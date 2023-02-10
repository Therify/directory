/**
 *
 * @param obj - The object to extract from
 * @param path - The dot-notated path to extract from
 * @returns
 */
export function extractAtPath(obj: Record<string, unknown>, path: string) {
    const keys = path.split('.');
    let result: unknown;
    for (const key of keys) {
        result = result
            ? (result as Record<string, unknown>)[key as keyof typeof result]
            : obj[key];
    }
    return result;
}
